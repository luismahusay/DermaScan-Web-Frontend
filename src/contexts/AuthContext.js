import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [otpStore, setOtpStore] = useState({}); // temp storage for OTPs

  // ---------- Email Check Function ----------
  const checkEmailAvailability = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length === 0; // true if email is available
    } catch (error) {
      console.error("Error checking email availability:", error);
      throw new Error("Failed to verify email availability. Please try again.");
    }
  };

  // ---------- OTP Functions ----------
  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
  };

  const sendOTP = async (email) => {
    try {
      const otp = generateOTP();
      setOtpStore({ [email]: otp });

      await fetch("http://localhost:5000/api/email/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      console.log("OTP sent:", otp);
      return { success: true };
    } catch (error) {
      console.error("OTP sending error:", error);
      throw error;
    }
  };
  const sendApprovalNotification = async (email, firstName, isApproved) => {
    try {
      const subject = isApproved
        ? "Account Approved - DermaScan"
        : "Account Status Update - DermaScan";
      const htmlContent = isApproved
        ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745;">Congratulations, Dr. ${firstName}!</h2>
          <p>Your DermaScan dermatologist account has been <strong>approved</strong> by our administrator.</p>
          <p>You can now fully access all dermatologist features on our platform.</p>
          <p>Thank you for joining DermaScan!</p>
          <br>
          <p>Best regards,<br>The DermaScan Team</p>
        </div>
      `
        : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc3545;">Account Status Update</h2>
          <p>Dear Dr. ${firstName},</p>
          <p>We regret to inform you that your DermaScan dermatologist account application has been <strong>rejected</strong>.</p>
          <p>If you believe this is an error, please contact our support team.</p>
          <br>
          <p>Best regards,<br>The DermaScan Team</p>
        </div>
      `;

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key":
            "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",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "DermaScan", email: "eufemiocapoy.anhs@gmail.com" },
          to: [{ email }],
          subject,
          htmlContent,
        }),
      });

      console.log(
        `${isApproved ? "Approval" : "Rejection"} notification sent to:`,
        email
      );
      return { success: true };
    } catch (error) {
      console.error("Email notification error:", error);
      throw error;
    }
  };
 const verifyOTP = async (email, otp) => {
   try {
     if (otpStore[email] && otpStore[email] === otp) {
       if (currentUser) {
         await updateDoc(doc(db, "Users", currentUser.uid), {
           emailVerified: true, // 👈 ADD THIS
         });

         setUserProfile((prev) => ({
           ...prev,
           emailVerified: true, // 👈 ADD THIS
         }));
       }

       // Clear OTP after successful verification
       setOtpStore((prev) => {
         const updated = { ...prev };
         delete updated[email];
         return updated;
       });

       return { success: true };
     } else {
       throw new Error("Invalid or expired OTP");
     }
   } catch (error) {
     console.error("OTP verification error:", error);
     throw error;
   }
 };
  const approveDermatologist = async (userId) => {
    try {
      // Get user data first for email notification
      const userDoc = await getDoc(doc(db, "Users", userId));
      const userData = userDoc.data();

      await updateDoc(doc(db, "Users", userId), {
        User_ValidDermatologist_ID: true,
      });

      // Also update the ClinicDermatologist approval date
      const clinicDermQuery = await getDocs(
        query(
          collection(db, "ClinicDermatologist"),
          where("Dermatologist_ID", "==", userId)
        )
      );

      if (!clinicDermQuery.empty) {
        const clinicDermDoc = clinicDermQuery.docs[0];
        await updateDoc(clinicDermDoc.ref, {
          ClinicDermatologist_ApprovalDate: new Date().toISOString(),
        });
      }

      // 👉 Send approval notification email
      if (userData?.User_Email && userData?.User_FName) {
        await sendApprovalNotification(
          userData.User_Email,
          userData.User_FName,
          true
        );
      }

      return { success: true };
    } catch (error) {
      console.error("Error approving dermatologist:", error);
      throw error;
    }
  };
  const rejectDermatologist = async (userId) => {
    try {
      // Get user data first for email notification
      const userDoc = await getDoc(doc(db, "Users", userId));
      const userData = userDoc.data();

      await updateDoc(doc(db, "Users", userId), {
        User_ValidDermatologist_ID: false,
      });

      // 👉 Send rejection notification email
      if (userData?.User_Email && userData?.User_FName) {
        await sendApprovalNotification(
          userData.User_Email,
          userData.User_FName,
          false
        );
      }

      return { success: true };
    } catch (error) {
      console.error("Error rejecting dermatologist:", error);
      throw error;
    }
  };
  // ---------- Registration ----------
  const registerDermatologist = async (
    personalInfo,
    verificationInfo,
    password
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        personalInfo.emailAddress,
        password
      );

      await updateProfile(user, {
        displayName: `${personalInfo.firstName} ${personalInfo.lastName}`,
      });

      // Generate IDs
      const clinicId = generateClinicId();
      const locationId = generateLocationId();

      // Save user to Firestore (unverified initially)
      const userData = {
        User_ID: user.uid,
        User_FName: personalInfo.firstName,
        User_LName: personalInfo.lastName,
        User_MName: personalInfo.middleName || "",
        User_Email: personalInfo.emailAddress,
        User_Role: "dermatologist",
        User_ProfilePictureURL: "",
        User_Gender: personalInfo.gender,
        User_PhoneNumber: personalInfo.phoneNumber,
        User_HomeAddress: personalInfo.address,
        User_ValidDermatologist_ID: false,
        emailVerified: false,
      };
      await setDoc(doc(db, "Users", user.uid), userData);

      // Location
      const locationData = {
        Location_ID: locationId,
        Location_City: verificationInfo.city,
        Location_Region: verificationInfo.region,
        Location_ZipCode: verificationInfo.zipCode,
      };
      await setDoc(doc(db, "Location", locationId), locationData);

      // Clinic
      const timeSchedule =
        verificationInfo.clinicTimeSchedule || "08:00 AM - 05:00 PM";
      const [startTime, endTime] = timeSchedule.split(" - ");
      const clinicData = {
        Clinic_ID: clinicId,
        Clinic_Name: verificationInfo.clinicName,
        Clinic_Address: `${verificationInfo.clinicAddress}, ${verificationInfo.city}, ${verificationInfo.region} ${verificationInfo.zipCode}`,
        Clinic_AvailableDays: verificationInfo.clinicAvailableDays,
        Clinic_StartTime: startTime?.trim() || "08:00 AM",
        Clinic_EndTime: endTime?.trim() || "05:00 PM",
        Location_ID: locationId,
      };
      await setDoc(doc(db, "Clinic", clinicId), clinicData);

      // Clinic-Dermatologist relationship
      const clinicDermatologistData = {
        ClinicDermatologist_ID: `${clinicId}_${user.uid}`,
        Clinic_ID: clinicId,
        Dermatologist_ID: user.uid,
        ClinicDermatologist_ApprovalDate: null,
      };
      await setDoc(
        doc(db, "ClinicDermatologist", `${clinicId}_${user.uid}`),
        clinicDermatologistData
      );

      // 👉 After saving user, send OTP
      await sendOTP(personalInfo.emailAddress);

      return user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // ---------- Auth ----------
  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "Users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile(userData);

        // Only send OTP if email is NOT verified
        if (!userData.emailVerified) {
          await sendOTP(email);
        }
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  // ---------- Helpers ----------
  const generateClinicId = () => {
    return (
      "clinic_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  };
  const generateLocationId = () => {
    return (
      "location_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    registerDermatologist,
    login,
    logout,
    sendOTP,
    verifyOTP,
    checkEmailAvailability, // Add this to the context
    approveDermatologist, // Add this
    rejectDermatologist, // Add this
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
