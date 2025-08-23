import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadImages = async (productId, files) => {
    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));

    const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGES(productId), {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setUploading(false);
    return result.imageUrls;
  };

  return { uploadImages, uploading, uploadError };
};
