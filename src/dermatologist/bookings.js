import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Button,
  Modal,
} from "react-bootstrap";

const DermaBookings = () => {
  const [active, setActive] = useState("bookings"); // Set to bookings
  const [hovered, setHovered] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("Walk-In"); // Track active tab
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [modalPage, setModalPage] = useState(1);
  // Sample booking data
  const bookingData = [
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
    {
      id: "#20462",
      firstName: "Matt",
      lastName: "Dickerson",
      middleName: "A",
      dateBooked: "2024-11-12",
      time: "--",
    },
  ];

  // Notification data
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
  const handleDetailsClick = (patient) => {
    setCurrentPatient(patient);
    setShowPatientModal(true);
    setModalPage(1);
  };

  return (
    <>
      <style jsx>{`
        @media (min-width: 768px) {
          .main-content {
            margin-left: 50px !important;
            width: calc(100vw - 250px) !important;
          }
        }
        .admin-sidebar {
          width: 250px !important;
        }
        .sidebar {
          min-height: 100vh;
          background-color: #f8f9fa;
          border-right: 1px solid #2196f3;
          padding: 0;
        }
        .sidebar-item {
          padding: 12px 20px;
          color: #205efa;
          text-decoration: none;
          display: flex;
          align-items: center;
          border-radius: 8px;
          margin: 4px 12px;
          transition: all 0.3s ease;
          background-color: transparent;
        }
        .sidebar-item.active {
          background-color: #205efa;
          color: white;
        }
        .sidebar-item .sidebar-icon {
          width: 18px;
          height: 18px;
          transition: all 0.3s ease;
        }
        .sidebar-item:hover {
          background-color: #205efa;
          color: white;
        }
        .main-content {
          background-color: #f8f9fa;
          min-height: calc(100vh - 80px);
          padding: 20px;
        }
        .brand-section {
          display: flex;
          align-items: center;
        }
        .brand-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: #007bff;
          margin-bottom: 0;
        }
        .brand-tagline {
          font-size: 1rem;
          color: #205efa;
          margin: 0;
        }
        .search-container {
          position: relative;
        }
        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }
        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .navbar.border-bottom {
          border-bottom: 1px solid #2196f3 !important;
        }
        .custom-search-input {
          border: 1px solid #205efa;
          padding-right: 40px;
          border-radius: 6px;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .custom-search-input:focus {
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(32, 94, 250, 0.25);
          border-color: #205efa;
        }
        .header-icon {
          width: 40px;
          height: 40px;
          background-color: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6c757d;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          position: relative;
        }
        .header-icon:hover {
          background-color: #e9ecef;
          color: #495057;
        }
        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background-color: #dc3545;
          border-radius: 50%;
        }
        .notification-dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 20px;
          width: 450px;
          z-index: 1000;
          font-family: "Segoe UI", sans-serif;
        }
        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .notification-title {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
        .mark-read-link {
          color: #3b82f6;
          font-size: 14px;
          text-decoration: none;
        }
        .mark-read-link:hover {
          text-decoration: underline;
        }
        .notification-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          padding: 12px;
          border-radius: 10px;
          background-color: #e8f0fe;
        }
        .notification-icon {
          width: 40px;
          height: 40px;
          background-color: #e0ecff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
          flex-shrink: 0;
        }
        .notification-content {
          flex: 1;
        }
        .notification-text {
          font-weight: bold;
          margin: 0 0 4px 0;
          font-size: 14px;
        }
        .notification-time {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 6px 0;
        }
        .notification-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .notification-ago {
          font-size: 12px;
          color: #9ca3af;
        }
        .notification-tag {
          background-color: #f3f4f6;
          color: #6b7280;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 500;
        }

        /* Bookings specific styles */
        .bookings-container {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          margin-top: 20px;
        }
        .bookings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .bookings-title {
          font-size: 2rem;
          font-weight: bold;
          color: #000;
          margin: 0;
        }
        .tab-buttons {
          display: flex;
          gap: 0;
          margin-bottom: 24px;
        }
        .tab-button {
          padding: 12px 24px;
          border: 2px solid #205efa;
          background: white;
          color: #205efa;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tab-button:first-child {
          border-radius: 8px 0 0 8px;
        }
        .tab-button:last-child {
          border-radius: 0 8px 8px 0;
        }
        .tab-button.active {
          background: #205efa;
          color: white;
          border: 2px solid #205efa;
        }
        .table-controls {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 20px;
          gap: 24px;
        }
        .entries-control {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        .entries-select {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 14px;
        }
        .search-control {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .search-input {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 14px;
          width: 200px;
        }
        .filters-button {
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
        }
        .bookings-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        .bookings-table th {
          background: #f8f9fa;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 1px solid #dee2e6;
          font-size: 14px;
        }
        .bookings-table td {
          padding: 12px;
          border-bottom: 1px solid #dee2e6;
          color: #495057;
          font-size: 14px;
        }
        .bookings-table tbody tr:hover {
          background-color: #f8f9fa;
        }
        .action-buttons {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .action-btn {
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
        }
        .accept-btn {
          background: #d4edda;
          color: #155724;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .reject-btn {
          background: #f8d7da;
          color: #721c24;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .details-btn {
          background: #cce5ff;
          color: #0056b3;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .accept-btn:hover {
          background: #c3e6cb;
        }
        .reject-btn:hover {
          background: #f1b0b7;
        }
        .details-btn:hover {
          background: #b3d9ff;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        }
        .pagination button {
          border: 1px solid #ddd;
          background: white;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        .pagination button.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
        .pagination button:hover:not(.active) {
          background: #f8f9fa;
        }
        .pagination button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
      {showPatientModal && (
        <>
          {/* Modal Backdrop */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1050,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShowPatientModal(false)}
          >
            {/* Modal Content */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                width: "1300px",
                maxHeight: "120vh",
                height: "90vh",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                style={{
                  backgroundColor: "#205EFA",
                  margin: "-1rem 0rem 0 -.05rem",
                  borderRadius: "12px 12px 12px 12px",
                  position: "relative",
                  color: "white",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    padding: "40px 0",
                    paddingTop: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "100%",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  🔍 Patient Information
                </div>
              </div>

              {/* Modal Body */}
              <div
                style={{
                  backgroundColor: "#F8F9FA",
                  padding: "30px",
                  position: "relative",
                  height: "calc(100% - 90px)",
                  overflowY: "auto",
                }}
              >
                {/* Close Button - Top Right Corner */}
                <button
                  onClick={() => setShowPatientModal(false)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "40px",
                    background: "none",
                    border: "none",
                    fontSize: "30px",
                    color: "#000000",
                    cursor: "pointer",
                    zIndex: 1000,
                  }}
                >
                  ✕
                </button>

                {modalPage === 1 ? (
                  // Page 1: Patient Info & Face Scan
                  <div>
                    {/* Patient ID - Single Line */}
                    <div className="row mb-0">
                      <div className="col-12">
                        <div
                          className="mb-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <strong style={{ minWidth: "120px" }}>
                            Patient ID:
                          </strong>
                          <span style={{ marginLeft: "10px" }}>U-1012</span>
                        </div>
                      </div>
                    </div>

                    {/* Patient Name - Single Line */}
                    <div className="row mb-0">
                      <div className="col-12">
                        <div
                          className="mb-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <strong style={{ minWidth: "120px" }}>Name:</strong>
                          <span style={{ marginLeft: "10px" }}>
                            Juan C. Dela Cruz
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Date Booked - Single Line */}
                    <div className="row mb-0">
                      <div className="col-12">
                        <div
                          className="mb-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <strong style={{ minWidth: "120px" }}>
                            Date Booked:
                          </strong>
                          <span style={{ marginLeft: "10px" }}>2025-06-10</span>
                        </div>
                      </div>
                    </div>

                    {/* Time - Single Line */}
                    <div className="row mb-4">
                      <div className="col-12">
                        <div
                          className="mb-3"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <strong style={{ minWidth: "120px" }}>Time:</strong>
                          <span style={{ marginLeft: "10px" }}>2:00 PM</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Information */}
                    <div className="row mb-3">
                      <div className="col-12">
                        <div className="mb-3">
                          <strong style={{ fontSize: "22px" }}>
                            Booking Information:
                          </strong>
                          <div
                            style={{
                              marginLeft: "20px",
                              marginTop: "10px",
                              lineHeight: "1.6",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "8px",
                                marginLeft: "-20px",
                              }}
                            >
                              <strong style={{ minWidth: "120px" }}>
                                Booking Type:
                              </strong>
                              <span style={{ marginLeft: "10px" }}>Online</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "8px",
                                marginLeft: "-20px",
                              }}
                            >
                              <strong style={{ minWidth: "120px" }}>
                                Platform:
                              </strong>
                              <span style={{ marginLeft: "10px" }}>
                                Google Meet
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "8px",
                                marginLeft: "-20px",
                              }}
                            >
                              <strong style={{ minWidth: "120px" }}>
                                Consultation Link:
                              </strong>
                              <span style={{ marginLeft: "10px" }}>
                                <a
                                  href="#"
                                  style={{
                                    color: "#4285f4",
                                    textDecoration: "underline",
                                  }}
                                >
                                  https://meet.google.com/xyz-1234
                                </a>
                              </span>
                            </div>
                            <div
                              style={{ marginTop: "8px", marginLeft: "130px" }}
                            >
                              <a
                                href="#"
                                style={{
                                  color: "#4285f4",
                                  textDecoration: "none",
                                  marginRight: "40px",
                                  fontSize: "14px",
                                  marginLeft: "-10px",
                                }}
                              >
                                📋 Copy Link
                              </a>
                              <a
                                href="#"
                                style={{
                                  color: "#4285f4",
                                  textDecoration: "none",
                                  fontSize: "14px",
                                }}
                              >
                                📱 Open in New Tab
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Face Scan Result */}
                    <div className="row mb-4">
                      <div className="col-12">
                        <div className="mb-3">
                          <strong>Face Scan Result:</strong>
                          <div
                            style={{ marginLeft: "20px", marginTop: "15px" }}
                          >
                            <img
                              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23e8b4a0'/%3E%3Ctext x='100' y='75' font-family='Arial' font-size='12' fill='%23666' text-anchor='middle'%3EFace Scan Image%3C/text%3E%3C/svg%3E"
                              alt="Face scan result"
                              style={{
                                width: "200px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "12px",
                                border: "2px solid #e0e0e0",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Next Button - Bottom Right */}
                    <div className="row">
                      <div className="col-12 d-flex justify-content-end">
                        <button
                          onClick={() => setModalPage(2)}
                          style={{
                            backgroundColor: "#205EFA",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            marginRight: "15px",
                            padding: "10px 40px",
                            fontWeight: "500",
                            cursor: "pointer",
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Page 2: Skin Analysis & Product Recommendations
                  <div>
                    {/* Patient Details (repeated) */}
                    <div className="row mb-0">
                      <div className="col-12">
                        <div
                          className="mb-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <strong style={{ minWidth: "120px" }}>
                            Patient ID:
                          </strong>
                          <span style={{ marginLeft: "10px" }}>U-1012</span>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-0">
                      <div className="col-12">
                        <div
                          className="mb-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <strong style={{ minWidth: "120px" }}>Name:</strong>
                          <span style={{ marginLeft: "10px" }}>
                            Juan C. Dela Cruz
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-0">
                      <div className="col-12">
                        <div
                          className="mb-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <strong style={{ minWidth: "120px" }}>
                            Date Booked:
                          </strong>
                          <span style={{ marginLeft: "10px" }}>2025-06-10</span>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-12">
                        <div
                          className="mb-3"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <strong style={{ minWidth: "120px" }}>Time:</strong>
                          <span style={{ marginLeft: "10px" }}>2:00 PM</span>
                        </div>
                      </div>
                    </div>

                    {/* Skin Analysis */}
                    <div className="row mb-3">
                      <div className="col-12">
                        <div className="mb-3">
                          <strong style={{ fontSize: "22px" }}>
                            Skin Analysis:
                          </strong>
                          <div
                            style={{
                              marginLeft: "20px",
                              marginTop: "10px",
                              lineHeight: "1.6",
                            }}
                          >
                            <div
                              style={{
                                marginLeft: "-20px",
                                marginBottom: "8px",
                              }}
                            >
                              <strong style={{ color: "#333" }}>
                                Risk Assessment:
                              </strong>
                              <span
                                style={{ marginLeft: "8px", color: "#666" }}
                              >
                                Lorem ipsum dolor sit amet. Non molestiae rerum
                                ut reprehenderit qui reprehenderit quid dicta
                              </span>
                            </div>
                            <div
                              style={{
                                marginLeft: "-20px",
                                marginBottom: "8px",
                              }}
                            >
                              <strong style={{ color: "#333" }}>
                                Results:
                              </strong>
                              <span
                                style={{
                                  marginLeft: "8px",
                                  color: "#4285f4",
                                  fontWeight: "500",
                                }}
                              >
                                Acne 85%
                              </span>
                            </div>
                            <div
                              style={{
                                marginLeft: "-20px",
                                marginBottom: "8px",
                              }}
                            >
                              <strong style={{ color: "#333" }}>Advice:</strong>
                              <span
                                style={{ marginLeft: "8px", color: "#4285f4" }}
                              >
                                Visit a nearby dermatologist
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Recommendations */}
                    <div className="row mb-4">
                      <div className="col-12">
                        <div className="mb-3">
                          <strong>Product Recommendations:</strong>
                          <div
                            style={{
                              marginLeft: "20px",
                              marginTop: "15px",
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(140px, 1fr))",
                              gap: "12px",
                            }}
                          >
                            {[
                              {
                                name: "Differin Gel",
                                color: "#4285f4",
                                desc: "Differin has a 0.1% lightweight retinoid and is a nice addition to the nighttime skin care routine.",
                                dev: "Dr. Blue Mark Expedition MD",
                              },
                              {
                                name: "Cetaphil Moisturizing Cream",
                                color: "#34a853",
                                desc: "A rich, non-greasy moisturizer that provides long-lasting hydration for dry to very dry skin.",
                                dev: "Dr. Blue Wilson MD",
                              },
                              {
                                name: "Vitamin C Brightening Serum",
                                color: "#ff9800",
                                desc: "Powerful antioxidant serum that brightens skin tone and reduces signs of aging.",
                                dev: "Dr. Michael Chen MD",
                              },
                              {
                                name: "Retinol Complex",
                                color: "#9c27b0",
                                desc: "Advanced anti-aging formula that helps reduce fine lines.",
                                dev: "Dr. Sarah Johnson MD",
                              },
                            ].map((product, index) => (
                              <div
                                key={index}
                                style={{
                                  border: "1px solid #e0e0e0",
                                  borderRadius: "8px",
                                  padding: "15px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "15px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      backgroundColor: product.color,
                                      borderRadius: "4px",
                                      marginRight: "8px",
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {product.name}
                                  </div>
                                </div>
                                <div
                                  style={{
                                    fontSize: "11px",
                                    color: "#666",
                                    lineHeight: "1.3",
                                    marginBottom: "8px",
                                  }}
                                >
                                  {product.desc}
                                </div>
                                <div
                                  style={{
                                    fontSize: "10px",
                                    color: "#888",
                                    marginBottom: "8px",
                                  }}
                                >
                                  Developed by: {product.dev}
                                </div>
                                <button
                                  style={{
                                    width: "100%",
                                    padding: "9px 8px",
                                    backgroundColor: "#4285f4",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    fontSize: "13px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                  }}
                                >
                                  View More Info
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Previous Button - Bottom Right */}
                    <div className="row">
                      <div className="col-12 d-flex justify-content-end">
                        <button
                          onClick={() => setModalPage(1)}
                          style={{
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            marginRight: "15px",
                            padding: "10px 40px",
                            fontWeight: "500",
                            cursor: "pointer",
                          }}
                        >
                          Previous
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="d-flex flex-column vh-100">
        {/* Header */}
        <Navbar bg="white" className="border-bottom px-4 py-3">
          <Container fluid>
            <div className="brand-section">
              <img
                src="/icons/DermaScanLogo.png"
                alt="DermaScan Logo"
                style={{ width: "80px", height: "60px", marginRight: "12px" }}
              />
              <div>
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
                            <span className="notification-tag">
                              APPOINTMENT
                            </span>
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

        <div className="d-flex flex-grow-1">
          {/* Sidebar */}
          <div className="sidebar" style={{ width: "250px" }}>
            <Nav className="flex-column pt-4">
              <a
                href="#"
                className={`sidebar-item ${
                  active === "dashboard" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "dashboard"; // Change to your actual file names
                }}
                onMouseEnter={() => setHovered("dashboard")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/dashboardicon-${
                    hovered === "dashboard"
                      ? "white"
                      : active === "dashboard"
                      ? "blue"
                      : "blue"
                  }.png`}
                  alt="Dashboard"
                  className="sidebar-icon"
                  style={{ width: "15px", height: "15px", marginRight: "10px" }}
                />
                <span className="ms-2">Dashboard</span>
              </a>
              <a
                href="#"
                className={`sidebar-item ${
                  active === "products" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "productmanagement"; // Change to your actual file names
                }}
                onMouseEnter={() => setHovered("products")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/productsicon-${
                    hovered === "products" ? "white" : "blue"
                  }.png`}
                  alt="Products"
                  className="sidebar-icon"
                  style={{ width: "15px", height: "18px", marginRight: "10px" }}
                />
                <span className="ms-2">Products</span>
              </a>
              <a
                href="#"
                className={`sidebar-item ${
                  active === "bookings" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "bookings"; // Change to your actual file names
                }}
                onMouseEnter={() => setHovered("bookings")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/bookingsicon-${
                    hovered === "bookings" || active === "bookings"
                      ? "white"
                      : "blue"
                  }.png`}
                  alt="Bookings"
                  className="sidebar-icon"
                  style={{ width: "18px", height: "18px", marginRight: "10px" }}
                />
                <span className="ms-2">Bookings</span>
              </a>

              <a
                href="#"
                className={`sidebar-item ${
                  active === "patients" ? "active" : ""
                }`}
                onClick={() => setActive("patients")}
                onMouseEnter={() => setHovered("patients")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/patientsicon-${
                    hovered === "patients" ? "white" : "blue"
                  }.png`}
                  alt="Patients"
                  className="sidebar-icon"
                  style={{ width: "16px", height: "18px", marginRight: "10px" }}
                />
                <span className="ms-2">Patients</span>
              </a>
              <a
                href="#"
                className={`sidebar-item ${
                  active === "subscription" ? "active" : ""
                }`}
                onClick={() => setActive("subscription")}
                onMouseEnter={() => setHovered("subscription")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/subscriptionicon-${
                    hovered === "subscription" ? "white" : "blue"
                  }.png`}
                  alt="Subscriptions"
                  className="sidebar-icon"
                  style={{ width: "18px", height: "18px", marginRight: "10px" }}
                />
                <span className="ms-2">Subscriptions</span>
              </a>
            </Nav>
          </div>

          {/* Main Content - Bookings */}
          <div
            className="flex-grow-1 main-content"
            style={{ marginTop: "-70px", marginLeft: "-50px" }}
          >
            <Container fluid>
              <div className="bookings-container">
                <div className="bookings-header">
                  <h1 className="bookings-title">Pending Patients</h1>
                </div>

                {/* Tabs */}
                <div className="tab-buttons">
                  <button
                    className={`tab-button ${
                      activeTab === "Walk-In" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Walk-In")}
                  >
                    Walk-In
                  </button>
                  <button
                    className={`tab-button ${
                      activeTab === "Online" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Online")}
                  >
                    Online
                  </button>
                </div>

                {/* Table Controls */}
                <div className="table-controls">
                  <div className="entries-control">
                    <span>Show</span>
                    <select
                      className="entries-select"
                      value={entries}
                      onChange={(e) => setEntries(Number(e.target.value))}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <span>entries</span>
                  </div>

                  <div className="search-control">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div
                      className="d-flex align-items-center"
                      style={{ color: "#000000", cursor: "pointer" }}
                    >
                      <img
                        src="/icons/filtericon.png"
                        alt="Filter"
                        style={{
                          width: "15px",
                          height: "11px",
                          marginRight: "6px",
                          filter: "brightness(0)",
                        }}
                      />
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        Filter
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bookings Table */}
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name ↓</th>
                      <th>Last Name ↓</th>
                      <th>Middle Name ↓</th>
                      <th>Date Booked ↓</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingData.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.id}</td>
                        <td>{booking.firstName}</td>
                        <td>{booking.lastName}</td>
                        <td>{booking.middleName}</td>
                        <td>{booking.dateBooked}</td>
                        <td>{booking.time}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn accept-btn">
                              <span>✓</span>
                              ACCEPT
                            </button>
                            <button className="action-btn reject-btn">
                              <span>✕</span>
                              REJECT
                            </button>
                            <button
                              className="action-btn details-btn"
                              onClick={() => handleDetailsClick(booking)}
                            >
                              <span>👁</span>
                              DETAILS
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination">
                  <button disabled>Previous</button>
                  <button className="active">1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>Next</button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default DermaBookings;
