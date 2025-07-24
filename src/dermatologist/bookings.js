import React, { useState } from "react";
import {
  Container,
} from "react-bootstrap";
import {Layout} from "./Layout";

const DermaBookings = () => {
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
  const handleDetailsClick = (patient) => {
    setCurrentPatient(patient);
    setShowPatientModal(true);
    setModalPage(1);
  };

  return (
    <Layout currentPage="bookings">
      <style jsx>{`
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
        .product-grid {
          display: flex;
          overflow-x: auto;
          gap: 12px;
          padding-bottom: 10px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }

        .product-grid::-webkit-scrollbar {
          height: 8px;
        }

        .product-grid::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .product-grid::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .product-grid::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .product-card {
          flex: 0 0 280px;
          min-height: 180px;
        }
        @media (max-width: 768px) {
          .bookings-container {
            padding: 16px;
            margin-top: 10px;
          }

          .bookings-title {
            font-size: 1.5rem;
          }

          .tab-button {
            padding: 10px 16px;
            font-size: 14px;
          }

          .table-controls {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .search-control {
            justify-content: space-between;
          }

          .search-input {
            width: 150px;
          }

          /* Make table horizontally scrollable */
          .table-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .bookings-table {
            min-width: 800px;
          }

          .bookings-table th,
          .bookings-table td {
            padding: 8px;
            font-size: 13px;
          }

          .action-buttons {
            flex-direction: column;
            gap: 4px;
          }

          .action-btn {
            padding: 4px 8px;
            font-size: 11px;
          }

          /* Modal adjustments */
          .modal-content {
            width: 95vw !important;
            height: 95vh !important;
            margin: 2.5vh auto;
          }

          .modal-header .modal-title {
            font-size: 24px !important;
            padding: 30px 0 !important;
          }

          .modal-body {
            padding: 20px !important;
          }
        }

        /* Mobile styles (480px and below) */
        @media (max-width: 480px) {
          .bookings-container {
            padding: 12px;
          }

          .bookings-title {
            font-size: 1.25rem;
          }

          .tab-buttons {
            flex-direction: column;
          }

          .tab-button {
            border-radius: 8px !important;
            margin-bottom: 8px;
          }

          .tab-button:last-child {
            margin-bottom: 0;
          }

          .table-controls {
            gap: 12px;
          }

          .entries-control {
            font-size: 12px;
          }

          .search-input {
            width: 120px;
            font-size: 12px;
          }

          .bookings-table th,
          .bookings-table td {
            padding: 6px;
            font-size: 12px;
          }

          .pagination {
            flex-wrap: wrap;
            gap: 4px;
          }

          .pagination button {
            padding: 6px 8px;
            font-size: 12px;
          }

          /* Modal full screen on mobile */
          .modal-content {
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }

          .modal-header {
            border-radius: 0 !important;
          }

          .modal-header .modal-title {
            font-size: 20px !important;
            padding: 20px 0 !important;
          }

          .modal-body {
            padding: 15px !important;
          }

          .close-button {
            top: 10px !important;
            right: 20px !important;
            font-size: 24px !important;
          }

          /* Product recommendations grid adjustment */
          .product-grid {
            display: flex !important;
            overflow-x: auto !important;
            gap: 12px !important;
            padding-bottom: 10px !important;
            -webkit-overflow-scrolling: touch !important;
          }

          .product-card {
            flex: 0 0 280px !important;
            padding: 12px !important;
          }
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
              className="modal-content" // Add this class
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
                  className="close-button"
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
                            className="product-grid"
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
                                className="product-card"
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
              className={`tab-button ${activeTab === "Online" ? "active" : ""}`}
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
          <div className="table-wrapper">
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
          </div>
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
    </Layout>
  );
};

export default DermaBookings;
