// Header.js
import React, { useState } from "react";
import { Navbar, Container, InputGroup, Form } from "react-bootstrap";

const Header = ({ showSidebar, setShowSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);

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

  return (
    <Navbar bg="white" className="border-bottom px-4 py-3">
      <Container fluid>
        <div className="brand-section">
          <button
            className="mobile-menu-btn me-2"
            onClick={() => setShowSidebar(!showSidebar)} // You'll need to add this state
          >
            {/* <img
              src="/icons/hamburgericon.png"
              alt="Menu"
              style={{ width: "20px", height: "20px" }}
            /> */}
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

          <div style={{ position: "relative" }}>
            <button
              className="header-icon"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <img
                src="/icons/notificationicon.png"
                alt="Notification"
                style={{ width: "30px", height: "30px" }}
              />
              <div className="notification-badge"></div>
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h5 className="notification-title">New Appointments</h5>
                  <a href="#" className="mark-read-link">
                    Mark all as read
                  </a>
                </div>

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
                        <span className="notification-tag">APPOINTMENT</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="header-icon">
            <img
              src="/icons/profileicon.png"
              alt="User"
              style={{ width: "30px", height: "30px" }}
            />
          </button>
        </div>
      </Container>
    </Navbar>
  );
};
export default Header;
