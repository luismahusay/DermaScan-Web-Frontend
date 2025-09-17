import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadImages = async (productId, files) => {
    setUploading(true);
    setUploadError(null);

    try {
      const storage = getStorage();

      // Validate files
      const validFiles = Array.from(files).filter((file) => {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
          throw new Error(
            `Invalid file type: ${file.name}. Only JPEG, PNG, and WebP are allowed.`
          );
        }
        if (file.size > maxSize) {
          throw new Error(`File too large: ${file.name}. Maximum size is 5MB.`);
        }
        return true;
      });

      if (validFiles.length > 5) {
        throw new Error("Maximum 5 files allowed");
      }

      const uploadPromises = validFiles.map(async (file) => {
        try {
          // Generate unique filename
          const fileExtension = file.name.split(".").pop();
          const timestamp = Date.now();
          const randomString = Math.random().toString(36).substring(2, 15);
          const fileName = `${productId}_${timestamp}_${randomString}.${fileExtension}`;

          // Create storage reference
          const storageRef = ref(storage, `products/${fileName}`);

          // Upload file
          const snapshot = await uploadBytes(storageRef, file, {
            contentType: file.type,
          });

          // Get download URL
          return await getDownloadURL(snapshot.ref);
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);
          return null;
        }
      });

      const results = await Promise.all(uploadPromises);
      const imageUrls = results.filter((url) => url !== null);

      setUploading(false);
      return imageUrls;
    } catch (error) {
      setUploadError(error.message);
      setUploading(false);
      throw error;
    }
  };

  const deleteImages = async (imageUrls) => {
    try {
      const storage = getStorage();

      const deletePromises = imageUrls.map(async (url) => {
        try {
          // Extract file path from Firebase URL
          const urlParts = new URL(url);
          const path = decodeURIComponent(
            urlParts.pathname.split("/o/")[1].split("?")[0]
          );

          // Create reference and delete
          const fileRef = ref(storage, path);
          await deleteObject(fileRef);
          return true;
        } catch (error) {
          console.error(`Failed to delete ${url}:`, error);
          return false;
        }
      });

      const results = await Promise.all(deletePromises);
      return results.filter((result) => result === true).length;
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  };

  return { uploadImages, deleteImages, uploading, uploadError };
};
