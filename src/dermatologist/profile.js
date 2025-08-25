import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "./Layout";
import "../styles/derma_profile.css";
import { useAuth } from "../contexts/AuthContext";
import { useProfilePictureUpload } from "../hooks/useProfilePictureUpload";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";

const DermaProfile = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    address: "",
    email: "",
    gender: "Male",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    clinicAddress: "",
    city: "",
    region: "",
    zipCode: "",
    clinicName: "",
    clinicSchedule: "",
    enableEmailNotifications: false,
    muteNotificationsDuringOffHours: false,
    notificationTimeFrom: "09:00",
    notificationTimeTo: "17:00",
    twoFactorEnabled: false,
    profilePicture: "",
    licenseImageUrl: "",
    validIdImageUrl: "",
  });
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const { uploadProfilePicture, uploading: pictureUploading } =
    useProfilePictureUpload();
  const [modalImage, setModalImage] = useState({
    show: false,
    url: "",
    title: "",
  });
  const openImageModal = (imageUrl, title) => {
    setModalImage({ show: true, url: imageUrl, title });
  };

  const closeImageModal = () => {
    setModalImage({ show: false, url: "", title: "" });
  };
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser || !userProfile) {
        setLoading(false);
        return;
      }

      try {
        const customUserId = userProfile.User_ID;

        // Load user data
        const userDoc = await getDoc(doc(db, "Users", customUserId));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Load clinic data
          const clinicQuery = query(
            collection(db, "ClinicDermatologist"),
            where("Dermatologist_ID", "==", customUserId)
          );
          const clinicSnapshot = await getDocs(clinicQuery);

          let clinicData = {};
          if (!clinicSnapshot.empty) {
            const clinicRelation = clinicSnapshot.docs[0].data();
            const clinicDoc = await getDoc(
              doc(db, "Clinic", clinicRelation.Clinic_ID)
            );
            if (clinicDoc.exists()) {
              clinicData = clinicDoc.data();
            }
          }

          // Populate form with existing data
          setFormData({
            firstName: userData.User_FName || "",
            lastName: userData.User_LName || "",
            middleName: userData.User_MName || "",
            phoneNumber: userData.User_PhoneNumber || "",
            address: userData.User_HomeAddress || "",
            email: userData.User_Email || "",
            gender: userData.User_Gender || "Male",
            clinicName: clinicData.Clinic_Name || "",
            clinicAddress: clinicData.Clinic_Address || "",
            clinicSchedule: `${clinicData.Clinic_StartTime || ""} - ${
              clinicData.Clinic_EndTime || ""
            }`,
            // Keep password fields empty for security
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            // Default notification settings
            enableEmailNotifications: false,
            muteNotificationsDuringOffHours: false,
            notificationTimeFrom: "09:00",
            notificationTimeTo: "17:00",
            twoFactorEnabled: false,
            profilePicture: userData.User_ProfilePictureURL || "",
            licenseImageUrl: userData.User_LicenseImageURL || "",
            validIdImageUrl: userData.User_ValidIdImageURL || "",
          });
          if (userData.User_ProfilePictureURL) {
            setProfilePictureUrl(userData.User_ProfilePictureURL);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setMessage("Error loading profile data");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [currentUser, userProfile]);
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Please upload a valid image file (JPEG, PNG, JPG, WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setMessage("File size must be less than 5MB");
      return;
    }

    try {
      const imageUrl = await uploadProfilePicture(userProfile.User_ID, file);
      setProfilePictureUrl(imageUrl);
      setFormData((prev) => ({ ...prev, profilePicture: imageUrl }));
      setMessage("Profile picture uploaded successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading profile picture. Please try again.");
    }
  };
  const handleDocumentUpload = async (event, documentType) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Please upload a valid image or PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit for documents
      setMessage("File size must be less than 10MB");
      return;
    }

    try {
      setMessage("Uploading document...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "verification-documents");

      const response = await fetch("/api/upload/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          [documentType]: result.url,
        }));
        setMessage(
          `${
            documentType === "licenseImageUrl" ? "License ID" : "Valid ID"
          } uploaded successfully!`
        );
        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading document. Please try again.");
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!currentUser || !userProfile) {
      setMessage("User not authenticated");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const customUserId = userProfile.User_ID;

      // Update user data in Users collection
      const userUpdates = {
        User_FName: formData.firstName,
        User_LName: formData.lastName,
        User_MName: formData.middleName,
        User_PhoneNumber: formData.phoneNumber,
        User_HomeAddress: formData.address,
        User_Email: formData.email,
        User_Gender: formData.gender,
        User_ProfilePictureURL: formData.profilePicture,
        User_LicenseImageURL: formData.licenseImageUrl,
        User_ValidIdImageURL: formData.validIdImageUrl,
      };

      await updateDoc(doc(db, "Users", customUserId), userUpdates);

      // Update clinic data if it exists
      const clinicQuery = query(
        collection(db, "ClinicDermatologist"),
        where("Dermatologist_ID", "==", customUserId)
      );
      const clinicSnapshot = await getDocs(clinicQuery);

      if (!clinicSnapshot.empty) {
        const clinicRelation = clinicSnapshot.docs[0].data();
        const [startTime, endTime] = formData.clinicSchedule.split(" - ");

        const clinicUpdates = {
          Clinic_Name: formData.clinicName,
          Clinic_Address: formData.clinicAddress,
          Clinic_StartTime: startTime?.trim() || "08:00 AM",
          Clinic_EndTime: endTime?.trim() || "05:00 PM",
        };

        await updateDoc(
          doc(db, "Clinic", clinicRelation.Clinic_ID),
          clinicUpdates
        );
      }

      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving changes:", error);
      setMessage("Error saving changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleBackClick = () => {
    window.location.href = "/dermatologist/dashboard"; // Navigate to dermatologist dashboard
  };

  return (
    <Layout currentPage="profile" hideSidebar={true}>
      <div className="profile-container">
        <Container>
          {/* Profile Header */}
          <div className="profile-header">
            <button className="back-button" onClick={handleBackClick}>
              <i className="fas fa-arrow-left"></i>
              Back
            </button>

            <div className="text-center">
              <div
                className="profile-avatar"
                style={{ position: "relative", cursor: "pointer" }}
              >
                {profilePictureUrl || formData.profilePicture ? (
                  <img
                    src={profilePictureUrl || formData.profilePicture}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <i className="fas fa-user"></i>
                )}
                <div
                  className="camera-icon"
                  onClick={() =>
                    document.getElementById("profilePictureInput").click()
                  }
                  style={{ cursor: "pointer" }}
                >
                  {pictureUploading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-camera"></i>
                  )}
                </div>
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfilePictureUpload}
                  disabled={pictureUploading}
                />
              </div>
              <h6 className="mb-0">Profile Picture</h6>
              {pictureUploading && (
                <small className="text-muted">Uploading...</small>
              )}
            </div>
          </div>
          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {message && (
            <div
              className={`alert ${
                message.includes("Error") ? "alert-danger" : "alert-success"
              } mt-3`}
            >
              {message}
            </div>
          )}
          <Row>
            {/* Personal Information */}
            <Col lg={6}>
              <div className="profile-section">
                <h5 className="section-title">Personal Information</h5>

                <div className="form-group">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Middle Name:</label>
                  <input
                    type="text"
                    name="middleName"
                    className="form-control"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    placeholder="Enter middle name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number:</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Address:</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gender:</label>
                  <select
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Security Settings */}
              <div className="profile-section">
                <h5 className="section-title">Security Settings</h5>

                <div className="form-group">
                  <label className="form-label">Current Password:</label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Password:</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password:</label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    className="form-control"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="form-group">
                  <div className="notification-item">
                    <div className="notification-text">
                      <i
                        className="fas fa-shield-alt"
                        style={{ color: "#6c757d" }}
                      ></i>
                      <span>Two-Factor Authentication (2FA)</span>
                      <span
                        style={{
                          color: formData.twoFactorEnabled
                            ? "#28a745"
                            : "#dc3545",
                          fontSize: "0.8rem",
                        }}
                      >
                        {formData.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    <div
                      className={`toggle-switch ${
                        formData.twoFactorEnabled ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          twoFactorEnabled: !prev.twoFactorEnabled,
                        }))
                      }
                    ></div>
                  </div>
                  {formData.twoFactorEnabled && (
                    <div className="two-factor-info">
                      <div className="info-icon">i</div>
                      <span style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                        When enabled, you'll need to enter a code from your
                        email when logging in.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Col>

            {/* Verification & Settings */}
            <Col lg={6}>
              <div className="profile-section">
                <h5 className="section-title">Verification</h5>

                <div className="form-group">
                  <label className="form-label">License ID:</label>
                  <div className="document-upload-section">
                    {formData.licenseImageUrl ? (
                      <div className="document-preview-image">
                        <img
                          src={formData.licenseImageUrl}
                          alt="License ID"
                          className="preview-thumbnail"
                          onClick={() =>
                            openImageModal(
                              formData.licenseImageUrl,
                              "License ID"
                            )
                          }
                        />
                        <div className="image-overlay">
                          <i className="fas fa-search-plus"></i>
                          <span>Click to enlarge</span>
                        </div>
                      </div>
                    ) : (
                      <div className="no-document-placeholder">
                        <i className="fas fa-file-image"></i>
                        <span>No license ID uploaded</span>
                      </div>
                    )}
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() =>
                        document.getElementById("licenseIdInput").click()
                      }
                    >
                      {formData.licenseImageUrl ? "Replace" : "Choose File"}
                    </button>
                    <input
                      type="file"
                      id="licenseIdInput"
                      accept="image/*,application/pdf"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleDocumentUpload(e, "licenseImageUrl")
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Valid ID:</label>
                  <div className="document-upload-section">
                    {formData.validIdImageUrl ? (
                      <div className="document-preview-image">
                        <img
                          src={formData.validIdImageUrl}
                          alt="Valid ID"
                          className="preview-thumbnail"
                          onClick={() =>
                            openImageModal(formData.validIdImageUrl, "Valid ID")
                          }
                        />
                        <div className="image-overlay">
                          <i className="fas fa-search-plus"></i>
                          <span>Click to enlarge</span>
                        </div>
                      </div>
                    ) : (
                      <div className="no-document-placeholder">
                        <i className="fas fa-file-image"></i>
                        <span>No valid ID uploaded</span>
                      </div>
                    )}
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() =>
                        document.getElementById("validIdInput").click()
                      }
                    >
                      {formData.validIdImageUrl ? "Replace" : "Choose File"}
                    </button>
                    <input
                      type="file"
                      id="validIdInput"
                      accept="image/*,application/pdf"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleDocumentUpload(e, "validIdImageUrl")
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Clinic Address:</label>
                  <input
                    type="text"
                    name="clinicAddress"
                    className="form-control"
                    value={formData.clinicAddress}
                    onChange={handleInputChange}
                    placeholder="Enter clinic address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City:</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Region:</label>
                  <input
                    type="text"
                    name="region"
                    className="form-control"
                    value={formData.region}
                    onChange={handleInputChange}
                    placeholder="Enter region"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Zip Code:</label>
                  <input
                    type="text"
                    name="zipCode"
                    className="form-control"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter zip code"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Clinic Name:</label>
                  <input
                    type="text"
                    name="clinicName"
                    className="form-control"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                    placeholder="Enter clinic name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Clinic Schedule:</label>
                  <input
                    type="text"
                    name="clinicSchedule"
                    className="form-control"
                    value={formData.clinicSchedule}
                    onChange={handleInputChange}
                    placeholder="Enter clinic schedule"
                  />
                </div>
              </div>

              {/* Notifications Settings */}
              <div className="profile-section">
                <h5 className="section-title">Notifications Settings</h5>

                <div className="notification-item">
                  <div className="notification-text">
                    <i
                      className="fas fa-envelope"
                      style={{ color: "#6c757d" }}
                    ></i>
                    <span>Enable Email Notifications</span>
                    <span
                      style={{
                        color: formData.enableEmailNotifications
                          ? "#28a745"
                          : "#dc3545",
                        fontSize: "0.8rem",
                      }}
                    >
                      {formData.enableEmailNotifications
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </div>
                  <div
                    className={`toggle-switch ${
                      formData.enableEmailNotifications ? "active" : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        enableEmailNotifications:
                          !prev.enableEmailNotifications,
                      }))
                    }
                  ></div>
                </div>

                <div className="notification-item">
                  <div className="notification-text">
                    <i
                      className="fas fa-bell-slash"
                      style={{ color: "#6c757d" }}
                    ></i>
                    <span>Mute Notifications During Off-Hours</span>
                  </div>
                  <div
                    className={`toggle-switch ${
                      formData.muteNotificationsDuringOffHours ? "active" : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        muteNotificationsDuringOffHours:
                          !prev.muteNotificationsDuringOffHours,
                      }))
                    }
                  ></div>
                </div>

                {formData.muteNotificationsDuringOffHours && (
                  <div className="time-input-group">
                    <div className="time-field-container">
                      <label className="time-label">From:</label>
                      <input
                        type="time"
                        name="notificationTimeFrom"
                        className="time-input"
                        value={formData.notificationTimeFrom}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="time-field-container">
                      <label className="time-label">To:</label>
                      <input
                        type="time"
                        name="notificationTimeTo"
                        className="time-input"
                        value={formData.notificationTimeTo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          {/* Save Button */}
          <div className="text-end mb-4">
            <button
              className="save-btn"
              onClick={handleSaveChanges}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </Container>
      </div>
      {modalImage.show && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="image-modal-header">
              <h5>{modalImage.title}</h5>
              <button className="modal-close-btn" onClick={closeImageModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="image-modal-body">
              <img
                src={modalImage.url}
                alt={modalImage.title}
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DermaProfile;
