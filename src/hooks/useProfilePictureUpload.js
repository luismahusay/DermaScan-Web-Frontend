import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useProfilePictureUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadProfilePicture = async (userId, file) => {
    setUploading(true);
    setUploadError(null);

    try {
      // Validate file
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and WebP are allowed."
        );
      }
      if (file.size > maxSize) {
        throw new Error("File too large. Maximum size is 5MB.");
      }

      const storage = getStorage();

      // Generate filename
      const fileExt = file.name.split(".").pop();
      const fileName = `profile_${userId}_${Date.now()}.${fileExt}`;

      // Create storage reference
      const storageRef = ref(storage, `profile-pictures/${fileName}`);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
      });

      // Get download URL
      const imageUrl = await getDownloadURL(snapshot.ref);

      setUploading(false);
      return imageUrl;
    } catch (error) {
      setUploadError(error.message);
      setUploading(false);
      throw error;
    }
  };

  const uploadVerificationImage = async (
    file,
    folder = "verification-documents"
  ) => {
    setUploading(true);
    setUploadError(null);

    try {
      // Validate file
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and WebP are allowed."
        );
      }
      if (file.size > maxSize) {
        throw new Error("File too large. Maximum size is 5MB.");
      }

      const storage = getStorage();

      // Generate filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}.${fileExt}`;

      // Create storage reference
      const storageRef = ref(storage, `${folder}/${fileName}`);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
      });

      // Get download URL
      const url = await getDownloadURL(snapshot.ref);

      setUploading(false);
      return { url, path: `${folder}/${fileName}` };
    } catch (error) {
      setUploadError(error.message);
      setUploading(false);
      throw error;
    }
  };

  return {
    uploadProfilePicture,
    uploadVerificationImage,
    uploading,
    uploadError,
  };
};
