import React, { createContext, useState } from "react";

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [verificationInfo, setVerificationInfo] = useState({});

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
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
