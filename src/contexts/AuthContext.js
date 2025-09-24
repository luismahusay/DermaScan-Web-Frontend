import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { API_ENDPOINTS } from "../config/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
const uploadImageDirectly = async (file, folder) => {
  try {
    console.log(`Starting image upload for ${folder}:`, {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    const storage = getStorage();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}.${fileExt}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);

    console.log(`Uploading to path: ${folder}/${fileName}`);

    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
    });

    console.log("Upload completed, getting download URL...");
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log(`Upload successful for ${folder}:`, downloadURL);
    return downloadURL;
  } catch (error) {
    console.error(`Upload error for ${folder}:`, error);

    // Provide more specific error messages
    if (error.code === "storage/unauthorized") {
      throw new Error(
        `Failed to upload ${folder} - permission denied. Check Firebase storage rules.`
      );
    } else if (error.code === "storage/canceled") {
      throw new Error(`Upload of ${folder} was canceled`);
    } else if (error.code === "storage/unknown") {
      throw new Error(`Unknown error occurred while uploading ${folder}`);
    } else if (error.code === "storage/retry-limit-exceeded") {
      throw new Error(`Upload of ${folder} failed - retry limit exceeded`);
    } else if (error.code === "storage/invalid-checksum") {
      throw new Error(`Upload of ${folder} failed - file may be corrupted`);
    } else {
      throw new Error(`Failed to upload ${folder}: ${error.message}`);
    }
  }
};
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [otpStore, setOtpStore] = useState({}); // temp storage for OTPs
  const [passwordResetOtpStore, setPasswordResetOtpStore] = useState({}); // temp storage for password reset OTPs

  // ---------- Email Check Function ----------
  const checkEmailAvailability = async (email) => {
    try {
      console.log("Checking email availability thoroughly for:", email);

      // First check Firebase Auth
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        console.log("Email found in Firebase Auth");
        return false;
      }

      // Also check your Firestore Users collection
      const usersQuery = query(
        collection(db, "Users"),
        where("User_Email", "==", email)
      );
      const userDocs = await getDocs(usersQuery);

      if (!userDocs.empty) {
        console.log("Email found in Firestore Users collection");
        return false;
      }

      console.log("Email is available in both Firebase Auth and Firestore");
      return true;
    } catch (error) {
      console.error("Error checking email availability:", error);

      // Handle specific Firebase errors
      if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email format.");
      } else if (error.code === "auth/network-request-failed") {
        throw new Error("Network error. Please check your connection.");
      } else if (error.code === "auth/too-many-requests") {
        throw new Error(
          "Too many requests. Please wait a moment and try again."
        );
      } else {
        throw new Error(
          "Failed to verify email availability. Please try again."
        );
      }
    }
  };

  // ---------- Check if Email Exists ----------
  const checkEmailExists = async (email) => {
    try {
      console.log("Checking email:", email); // Debug log
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log("Sign in methods found:", signInMethods); // Debug log
      console.log("Email exists:", signInMethods.length > 0); // Debug log
      return signInMethods.length > 0; // true if email exists
    } catch (error) {
      console.error("Error checking email existence:", error);
      console.error("Error code:", error.code); // Debug log
      console.error("Error message:", error.message); // Debug log
      throw new Error("Failed to verify email. Please try again.");
    }
  };

  // ---------- OTP Functions ----------
  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
  };

  const sendOTP = async (email, firstName = null) => {
    try {
      console.log("🔍 Starting sendOTP function...");
      console.log("📧 Email:", email);
      console.log("👤 First Name:", firstName);

      const otp = generateOTP();
      console.log("🔢 Generated OTP:", otp);

      // Store OTP locally first
      setOtpStore({ [email]: otp });
      console.log("💾 OTP stored locally");

      // Try to get firstName from multiple sources
      let displayName = firstName;

      if (!displayName && userProfile?.User_FName) {
        displayName = userProfile.User_FName;
        console.log("📝 Using firstName from userProfile:", displayName);
      }

      if (!displayName && currentUser?.displayName) {
        displayName = currentUser.displayName.split(" ")[0];
        console.log("📝 Using firstName from currentUser:", displayName);
      }

      if (!displayName) {
        displayName = "User"; // Fallback
        console.log("📝 Using fallback firstName:", displayName);
      }

      const requestBody = {
        email,
        firstName: displayName,
        otp,
      };

      console.log("📤 Request body:", requestBody);
      console.log("🌐 Making fetch request to server...");

      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch("http://localhost:5000/api/email/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Log response details
      console.log("📥 Response status:", response.status);
      console.log("📥 Response ok:", response.ok);
      console.log(
        "📥 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // Try to get response text first
      const responseText = await response.text();
      console.log("📄 Raw response text:", responseText);

      // Check if response is ok (status 200-299)
      if (!response.ok) {
        console.error("❌ Response not ok:", response.status);

        let errorMessage = "Failed to send OTP";

        if (responseText) {
          try {
            const errorData = JSON.parse(responseText);
            console.error("❌ Server error response:", errorData);
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch (parseError) {
            console.error("❌ Could not parse error response as JSON");
            errorMessage = responseText || errorMessage;
          }
        }

        throw new Error(`${errorMessage} (Status: ${response.status})`);
      }

      // Parse successful response
      let result;
      try {
        result = JSON.parse(responseText);
        console.log("✅ Parsed response:", result);
      } catch (parseError) {
        console.error(
          "❌ Could not parse success response as JSON:",
          parseError
        );
        console.error("Raw text was:", responseText);
        throw new Error("Server returned invalid JSON response");
      }

      if (result.success) {
        console.log("🎉 OTP sent successfully!");
        return { success: true };
      } else {
        console.error("❌ Server reported failure:", result);
        throw new Error(result.error || "OTP sending failed");
      }
    } catch (error) {
      console.error("💥 sendOTP Error:", error);
      console.error("💥 Error name:", error.name);
      console.error("💥 Error message:", error.message);
      console.error("💥 Error stack:", error.stack);

      // Provide more specific error messages
      if (error.name === "AbortError") {
        throw new Error(
          "Request timed out. Please check your internet connection and try again."
        );
      } else if (
        error.name === "TypeError" &&
        error.message.includes("fetch")
      ) {
        console.error("🚨 Fetch error - likely server connection issue");
        throw new Error(
          "Cannot connect to email service. Please check if the server is running on http://localhost:5000"
        );
      } else if (
        error.message.includes("NetworkError") ||
        error.message.includes("net::ERR")
      ) {
        throw new Error(
          "Network error. Please check your internet connection."
        );
      } else {
        throw error;
      }
    }
  };

  // ---------- Password Reset OTP Functions ----------
  // Alternative approach - Skip the email existence check and let Firebase handle it:
  const sendPasswordResetOTP = async (email) => {
    try {
      console.log("Starting password reset for:", email);

      // Skip email existence check and proceed directly
      // If email doesn't exist, we'll still send OTP but Firebase reset will fail silently

      const otp = generateOTP();
      console.log("Generated OTP:", otp); // Debug log (remove in production)

      // Store OTP with expiration time (10 minutes)
      setPasswordResetOtpStore({
        [email]: {
          otp: otp,
          expires: Date.now() + 10 * 60 * 1000, // 10 minutes from now
        },
      });

      const response = await fetch(
        "http://localhost:5000/api/email/send-password-reset-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send OTP");
      }

      console.log("Password Reset OTP sent successfully");
      return { success: true };
    } catch (error) {
      console.error("Password Reset OTP sending error:", error);
      throw error;
    }
  };
  const verifyPasswordResetOTP = async (email, otp) => {
    try {
      const storedData = passwordResetOtpStore[email];

      if (!storedData) {
        throw new Error("OTP not found or expired");
      }

      // Check if OTP is expired
      if (Date.now() > storedData.expires) {
        // Clean up expired OTP
        setPasswordResetOtpStore((prev) => {
          const updated = { ...prev };
          delete updated[email];
          return updated;
        });
        throw new Error("OTP has expired. Please request a new one.");
      }

      if (storedData.otp === otp) {
        return { success: true };
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      console.error("Password Reset OTP verification error:", error);
      throw error;
    }
  };

  const resetPasswordWithFirebase = async (email, otp) => {
    try {
      // Verify OTP first
      const otpVerification = await verifyPasswordResetOTP(email, otp);
      if (!otpVerification.success) {
        throw new Error("Invalid OTP");
      }

      // Send Firebase password reset email
      await sendPasswordResetEmail(auth, email);

      // Clear OTP after successful verification
      setPasswordResetOtpStore((prev) => {
        const updated = { ...prev };
        delete updated[email];
        return updated;
      });

      return {
        success: true,
        message:
          "Password reset email sent to your inbox. Please check your email and follow the instructions to reset your password.",
      };
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  };

  // Alternative method: Reset password for logged-in users
  const updateUserPassword = async (email, otp, newPassword) => {
    try {
      // Verify OTP first
      const otpVerification = await verifyPasswordResetOTP(email, otp);
      if (!otpVerification.success) {
        throw new Error("Invalid OTP");
      }

      // Since we can't update password without current authentication,
      // we'll use Firebase's built-in password reset email instead
      await sendPasswordResetEmail(auth, email);

      // Clear OTP after successful verification
      setPasswordResetOtpStore((prev) => {
        const updated = { ...prev };
        delete updated[email];
        return updated;
      });

      return {
        success: true,
        message:
          "Password reset email sent! Please check your email to complete the password reset.",
      };
    } catch (error) {
      console.error("Password update error:", error);
      throw error;
    }
  };

  const sendApprovalNotification = async (email, firstName, isApproved) => {
    try {
      await fetch("http://localhost:5000/api/email/send-approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, isApproved }),
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
        // Clear OTP first
        setOtpStore((prev) => {
          const updated = { ...prev };
          delete updated[email];
          return updated;
        });

        // Get the correct document ID to update
        let documentId = null;

        if (userProfile?.User_ID) {
          // Use custom ID if available
          documentId = userProfile.User_ID;
        } else if (currentUser) {
          // Fallback: try to get custom ID from mapping
          const mappingDoc = await getDoc(
            doc(db, "UserMapping", currentUser.uid)
          );
          if (mappingDoc.exists()) {
            documentId = mappingDoc.data().customUserId;
          } else {
            // Last resort: use Firebase UID for old users
            documentId = currentUser.uid;
          }
        }

        if (documentId) {
          await updateDoc(doc(db, "Users", documentId), {
            emailVerified: true,
          });

          setUserProfile((prev) => ({
            ...prev,
            emailVerified: true,
          }));
        }

        return { success: true };
      } else {
        throw new Error("Invalid or expired OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };
  const shouldSendOTP = (userData) => {
    // Don't send OTP if email is already verified
    if (userData.emailVerified) {
      return false;
    }

    // Don't send OTP if user was created recently (within last 5 minutes)
    // This prevents double OTP sending during registration flow
    const userCreationTime = userData.createdAt || 0;
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;

    if (userCreationTime > fiveMinutesAgo) {
      return false;
    }

    return true;
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

      // Send approval notification email
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

      // Send rejection notification email
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
      // First create Firebase user
      const { user } = await createUserWithEmailAndPassword(
        auth,
        personalInfo.emailAddress,
        password
      );

      await updateProfile(user, {
        displayName: `${personalInfo.firstName} ${personalInfo.lastName}`,
      });

      // Generate unique custom ID
      const customUserId = await generateUniqueCustomId();

      // Handle image uploads - call upload functions directly
      let licenseImageUrl = "";
      let validIdImageUrl = "";

      if (verificationInfo.licenseImage) {
        licenseImageUrl = await uploadImageDirectly(
          verificationInfo.licenseImage,
          "license-documents"
        );
      }

      if (verificationInfo.validIdImage) {
        validIdImageUrl = await uploadImageDirectly(
          verificationInfo.validIdImage,
          "id-documents"
        );
      }

      // Generate other IDs
      const clinicId = generateClinicId();
      const locationId = generateLocationId();

      // Save user to Firestore with CUSTOM ID as document ID
      const userData = {
        User_ID: customUserId, // Custom ID
        Firebase_UID: user.uid, // Keep Firebase UID for auth reference
        User_FName: personalInfo.firstName,
        User_LName: personalInfo.lastName,
        User_MName: personalInfo.middleName || "",
        User_Email: personalInfo.emailAddress,
        User_Role: "dermatologist",
        User_ProfilePictureURL: "",
        User_Gender: personalInfo.gender,
        User_PhoneNumber: personalInfo.phoneNumber,
        User_HomeAddress: personalInfo.address,
        User_LicenseImageURL: licenseImageUrl,
        User_ValidIdImageURL: validIdImageUrl,
        User_ValidDermatologist_ID: false,
        emailVerified: false,
        createdAt: Date.now(),
      };

      // Save with custom ID as document ID
      await setDoc(doc(db, "Users", customUserId), userData);
      setUserProfile(userData);
      // Create mapping for Firebase UID -> Custom ID lookup
      await setDoc(doc(db, "UserMapping", user.uid), {
        customUserId: customUserId,
        role: "dermatologist",
      });

      // Location data
      const locationData = {
        Location_ID: locationId,
        Location_City: verificationInfo.city,
        Location_Region: verificationInfo.region,
        Location_ZipCode: verificationInfo.zipCode,
      };
      await setDoc(doc(db, "Location", locationId), locationData);

      // Clinic data
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

      // Clinic-Dermatologist relationship (use custom ID)
      const clinicDermatologistData = {
        ClinicDermatologist_ID: `${clinicId}_${customUserId}`,
        Clinic_ID: clinicId,
        Dermatologist_ID: customUserId, // Use custom ID instead of Firebase UID
        ClinicDermatologist_ApprovalDate: null,
      };
      await setDoc(
        doc(db, "ClinicDermatologist", `${clinicId}_${customUserId}`),
        clinicDermatologistData
      );

      // Send OTP
      await sendOTP(personalInfo.emailAddress, personalInfo.firstName);

      return { user, customUserId };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  // ---------- Auth ----------
  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Get custom user ID from mapping
      const mappingDoc = await getDoc(doc(db, "UserMapping", user.uid));

      if (mappingDoc.exists()) {
        const { customUserId } = mappingDoc.data();
        const userDoc = await getDoc(doc(db, "Users", customUserId));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfile(userData);

          // Only send OTP if conditions are met
          if (shouldSendOTP(userData)) {
            await sendOTP(email, userData.User_FName);
          }
        }
      } else {
        // FALLBACK: Handle old users (before custom ID system)
        const oldUserDoc = await getDoc(doc(db, "Users", user.uid));

        if (oldUserDoc.exists()) {
          const userData = oldUserDoc.data();
          setUserProfile(userData);

          // For old users, you might want to:
          // Option 1: Always assume verified (since they existed before)
          // (No OTP will be sent)

          // Option 2: Still check emailVerified flag
          if (!userData.emailVerified) {
            await sendOTP(email, userData.User_FName);
          }
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
  const generateCustomUserId = () => {
    const now = new Date();

    // Get month (01-12)
    const month = String(now.getMonth() + 1).padStart(2, "0");

    // Get day (01-31)
    const day = String(now.getDate()).padStart(2, "0");

    // Get year (last 2 digits)
    const year = String(now.getFullYear()).slice(-2);

    // Generate random 2-digit number (01-99)
    const randomNumber = String(Math.floor(1 + Math.random() * 99)).padStart(
      2,
      "0"
    );

    // Format: MMDDYYRR (8 digits total)
    return `${month}${day}${year}${randomNumber}`;
  };
  const checkCustomIdExists = async (customId) => {
    try {
      const userDoc = await getDoc(doc(db, "Users", customId));
      return userDoc.exists();
    } catch (error) {
      console.error("Error checking custom ID:", error);
      return false;
    }
  };
  const generateUniqueCustomId = async (maxRetries = 10) => {
    for (let i = 0; i < maxRetries; i++) {
      const customId = generateCustomUserId();
      const exists = await checkCustomIdExists(customId);

      if (!exists) {
        return customId;
      }
    }

    // Fallback: add extra random digits if all retries failed
    const baseId = generateCustomUserId();
    const extraRandom = String(Math.floor(Math.random() * 100)).padStart(
      2,
      "0"
    );
    return `${baseId}${extraRandom}`; // Will be 10 digits if fallback is used
  };
  const getCustomUserIdFromFirebaseUID = async (firebaseUID) => {
    try {
      const mappingDoc = await getDoc(doc(db, "UserMapping", firebaseUID));
      if (mappingDoc.exists()) {
        return mappingDoc.data().customUserId;
      }
      return null;
    } catch (error) {
      console.error("Error getting custom user ID:", error);
      return null;
    }
  };
 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async (user) => {
     if (user) {
       setCurrentUser(user);

       // Get custom user ID from mapping first
       const mappingDoc = await getDoc(doc(db, "UserMapping", user.uid));

       if (mappingDoc.exists()) {
         const { customUserId } = mappingDoc.data();

         // Use custom ID to get user profile
         const userDoc = await getDoc(doc(db, "Users", customUserId));
         if (userDoc.exists()) {
           setUserProfile(userDoc.data());
         }
       } else {
         // FALLBACK: Handle old users (same as login function)
         const oldUserDoc = await getDoc(doc(db, "Users", user.uid));

         if (oldUserDoc.exists()) {
           const userData = oldUserDoc.data();
           setUserProfile(userData);
         }
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
    checkEmailAvailability,
    checkEmailExists,
    sendPasswordResetOTP,
    verifyPasswordResetOTP,
    resetPasswordWithFirebase,
    updateUserPassword,
    approveDermatologist,
    rejectDermatologist,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
