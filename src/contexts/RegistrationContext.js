import React, { createContext, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useProfilePictureUpload } from "../hooks/useProfilePictureUpload";
export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [verificationInfo, setVerificationInfo] = useState({});
  const uploadImageDirectly = async (file, folder) => {
    try {
      const storage = getStorage();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}.${fileExt}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);

      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
      });

      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Upload error:", error);
      return "";
    }
  };
const uploadImage = async (file, folder = "verification-documents") => {
  try {
    return await uploadImageDirectly(file, folder);
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: error.message };
  }
};
  const updatePersonalInfo = (data) => {
    setPersonalInfo(data);
  };

  const updateVerificationInfo = (data) => {
    setVerificationInfo(data);
  };

  const clearRegistrationData = () => {
    setPersonalInfo({});
    setVerificationInfo({});
  };

  const value = {
    personalInfo,
    verificationInfo,
    updatePersonalInfo,
    updateVerificationInfo,
    clearRegistrationData,
    uploadImage,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
