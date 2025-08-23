import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, storage, db } from "../config/firebase";

// File upload function
export const uploadFile = async (file, path) => {
  if (!file) return null;

  const fileRef = ref(storage, path);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

// Create dermatologist account
export const createDermatologistAccount = async (registrationData) => {
  const { personalInfo, verificationInfo, securityInfo } = registrationData;

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      personalInfo.emailAddress,
      securityInfo.password
    );

    const user = userCredential.user;

    // Upload files to storage
    const licenseUrl = await uploadFile(
      verificationInfo.licenseImage,
      `dermatologists/${user.uid}/license_${Date.now()}`
    );

    const validIdUrl = await uploadFile(
      verificationInfo.validIdImage,
      `dermatologists/${user.uid}/valid_id_${Date.now()}`
    );

    // Save dermatologist data to Firestore
    await setDoc(doc(db, "dermatologists", user.uid), {
      // Personal Information
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      middleName: personalInfo.middleName,
      suffix: personalInfo.suffix,
      emailAddress: personalInfo.emailAddress,
      phoneNumber: personalInfo.phoneNumber,
      address: personalInfo.address,
      gender: personalInfo.gender,

      // Clinic Information
      clinicAddress: verificationInfo.clinicAddress,
      city: verificationInfo.city,
      region: verificationInfo.region,
      zipCode: verificationInfo.zipCode,
      clinicName: verificationInfo.clinicName,
      clinicAvailableDays: verificationInfo.clinicAvailableDays,
      clinicTimeSchedule: verificationInfo.clinicTimeSchedule,

      // Verification Documents
      licenseUrl: licenseUrl,
      validIdType: verificationInfo.validIdType,
      validIdUrl: validIdUrl,

      // Security Settings
      twoFactorEnabled: securityInfo.twoFactorEnabled,

      // Status and Timestamps
      verificationStatus: "pending",
      accountStatus: "inactive",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Send email verification
    await sendEmailVerification(user);

    return { success: true, user };
  } catch (error) {
    console.error("Error creating dermatologist account:", error);
    throw error;
  }
};

// Check if dermatologist profile exists
export const getDermatologistProfile = async (uid) => {
  try {
    const docRef = doc(db, "dermatologists", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting dermatologist profile:", error);
    throw error;
  }
};

// Validation functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateFile = (file, maxSize = 5 * 1024 * 1024) => {
  // 5MB default
  if (!file) return { valid: false, error: "No file selected" };

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload JPEG or PNG files.",
    };
  }

  if (file.size > maxSize) {
    return { valid: false, error: "File size too large. Maximum size is 5MB." };
  }

  return { valid: true };
};
