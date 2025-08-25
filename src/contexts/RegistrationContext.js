import React, { createContext, useState } from "react";
import { API_ENDPOINTS } from "../config/api";
export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [verificationInfo, setVerificationInfo] = useState({});
  const uploadImage = async (file, folder = "verification-documents") => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch(API_ENDPOINTS.UPLOAD_VERIFICATION_IMAGE, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      return { success: true, url: data.url, path: data.path };
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
