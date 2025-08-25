import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

export const useProfilePictureUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadProfilePicture = async (userId, file) => {
    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      formData.append("userId", userId);

      const response = await fetch(API_ENDPOINTS.UPLOAD_PROFILE_PICTURE, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      setUploading(false);
      return result.imageUrl; // Note: changed from result.url to result.imageUrl
    } catch (error) {
      setUploadError(error.message);
      setUploading(false);
      throw error;
    }
  };

  return { uploadProfilePicture, uploading, uploadError };
};
