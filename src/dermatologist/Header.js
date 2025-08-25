// Header.js
import React, { useState, useEffect, useRef } from "react";
import { Navbar, Container, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = ({ showSidebar, setShowSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  

  const notifications = [
    {
      name: "Sarah Johnson",
      time: "July 15, 2025 at 2:00 PM",
      ago: "5 minutes ago",
    },
    {
      name: "Michael Chen",
      time: "July 18, 2025 at 9:00 AM",
      ago: "12 minutes ago",
    },
    {
      name: "Emma Rodriguez",
      time: "August 5, 2025 at 11:30 AM",
      ago: "28 minutes ago",
    },
    {
      name: "David Park",
      time: "July 22, 2025 at 3:15 PM",
      ago: "30 minutes ago",
    },
  ];

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 320);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll on mobile when notifications are open
      if (isMobile) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [showNotifications, isMobile]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleNotificationClose = () => {
    setShowNotifications(false);
  };

  const handleNotificationToggle = (e) => {
    setShowNotifications(!showNotifications);
    // Remove focus from the button to clear the gray background
    const button = e.currentTarget; // Gets the button element regardless of what was clicked inside
    button.blur();
  };

  const handleProfileToggle = (e) => {
    setShowProfileDropdown(!showProfileDropdown);
    // Remove focus from the button to clear the gray background
    const button = e.currentTarget;
    button.blur();
  };

  const handleProfileClose = () => {
    setShowProfileDropdown(false);
  };

  const handleMyProfile = (e) => {
    e.preventDefault();
    setShowProfileDropdown(false);
    window.location.href = "profile"; // Navigate to profile page
  };
  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileDropdown(false);
      navigate("/dermatologist/derma_login"); // Navigate without full reload
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Navbar bg="white" className="border-bottom px-4 py-3">
      <Container fluid>
        <div className="brand-section">
          <button
            className="mobile-menu-btn me-2"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <img
            src="/icons/DermaScanLogo.png"
            alt="DermaScan Logo"
            style={{ width: "80px", height: "60px", marginRight: "12px" }}
          />
          <div className="brand-text-elements">
            <img
              src="/icons/DermaScan.png"
              alt="DermaScan Text Logo"
              style={{ height: "24px" }}
            />
            <div className="brand-tagline">Scan.Detect.Care</div>
            <div className="brand-tagline">Dermatologist Page</div>
          </div>
        </div>

        <div className="header-actions">
          <div className="search-container">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type here..."
                className="custom-search-input"
              />
              <img
                src="/icons/searchicon.png"
                alt="Search"
                className="search-icon"
                style={{ width: "20px", height: "20px" }}
              />
            </InputGroup>
          </div>
          <button className="mobile-search-icon">
            <img
              src="/icons/searchicon.png"
              alt="Search"
              style={{ width: "20px", height: "20px" }}
            />
          </button>

          <div style={{ position: "relative" }} ref={notificationRef}>
            <button className="header-icon" onClick={handleNotificationToggle}>
              <img
                src="/icons/notificationicon.png"
                alt="Notification"
                style={{ width: "30px", height: "30px" }}
              />
              <div className="notification-badge"></div>
            </button>

            {showNotifications && (
              <>
                {/* Backdrop for very small screens */}
                {isMobile && (
                  <div
                    className="notification-backdrop"
                    onClick={handleNotificationClose}
                  />
                )}

                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h5 className="notification-title">New Appointments</h5>
                    <a
                      href="#"
                      className="mark-read-link"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle mark all as read logic here
                      }}
                    >
                      Mark all as read
                    </a>

                    {/* Close button for mobile modal */}
                    {isMobile && (
                      <button
                        className="mobile-close-btn"
                        onClick={handleNotificationClose}
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "16px",
                          background: "none",
                          border: "none",
                          fontSize: "24px",
                          cursor: "pointer",
                          color: "#666",
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="notifications-list">
                    {notifications.map((appt, index) => (
                      <div key={index} className="notification-item">
                        <div className="notification-icon">
                          <img
                            src="/icons/notificationcalendar.png"
                            alt="Calendar"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>
                        <div className="notification-content">
                          <p className="notification-text">
                            New appointment from {appt.name}
                          </p>
                          <p className="notification-time">
                            Appointment scheduled for {appt.time}
                          </p>
                          <div className="notification-meta">
                            <span className="notification-ago">{appt.ago}</span>
                            <span className="notification-tag">
                              APPOINTMENT
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div style={{ position: "relative" }} ref={profileRef}>
            <button className="header-icon" onClick={handleProfileToggle}>
              <img
                src="/icons/profileicon.png"
                alt="User"
                style={{ width: "30px", height: "30px" }}
              />
            </button>

            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div
                  className="profile-dropdown-item"
                  onClick={handleMyProfile}
                >
                  <img
                    src="/icons/avataricon.png"
                    alt="Profile"
                    className="profile-dropdown-icon"
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span>My Profile</span>
                </div>
                <div className="profile-dropdown-item" onClick={handleLogout}>
                  <img
                    src="/icons/logouticon.png"
                    alt="Logout"
                    className="profile-dropdown-icon"
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
