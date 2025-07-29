import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "./Layout"; // Import Layout instead of Header
import "../styles/derma_profile.css"; // Assuming you have a CSS file for styles

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
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
    // Add your save logic here
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
              <div className="profile-avatar">
                <i className="fas fa-user"></i>
                <div className="camera-icon">
                  <i className="fas fa-camera"></i>
                </div>
              </div>
              <h6 className="mb-0">Profile Picture</h6>
            </div>
          </div>

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
                  <div className="d-flex gap-2 align-items-center">
                    <span style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                      Upload Image
                    </span>
                    <button className="upload-btn">Choose File</button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Valid ID:</label>
                  <div className="d-flex gap-2 align-items-center">
                    <span style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                      Upload Image
                    </span>
                    <button className="upload-btn">Choose File</button>
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
            <button className="save-btn" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default DermaProfile;
