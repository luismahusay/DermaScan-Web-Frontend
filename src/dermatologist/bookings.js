import React, { useState } from "react";
import {
  Container,
} from "react-bootstrap";
import {Layout} from "./Layout";
import "../styles/derma_booking.css"; // Import your CSS styles

const DermaBookings = () => {
  const [activeTab, setActiveTab] = useState("Walk-In"); // Track active tab
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [modalPage, setModalPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
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
  const [filters, setFilters] = useState({
    bookingType: "",
    dateRange: "",
    timeSlot: "",
    status: "",
  });
  const filteredBookings = bookingData.filter((booking) => {
    const matchesSearch =
      booking.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBookingType =
      !filters.bookingType || activeTab === filters.bookingType;
    const matchesDateRange =
      !filters.dateRange ||
      filterByDateRange(booking.dateBooked, filters.dateRange);
    const matchesTimeSlot =
      !filters.timeSlot || filterByTimeSlot(booking.time, filters.timeSlot);

    return (
      matchesSearch && matchesBookingType && matchesDateRange && matchesTimeSlot
    );
  });
  const filterByDateRange = (bookingDate, range) => {
    const today = new Date();
    const bookingDateObj = new Date(bookingDate);

    switch (range) {
      case "today":
        return bookingDateObj.toDateString() === today.toDateString();
      case "week":
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return bookingDateObj >= weekAgo && bookingDateObj <= today;
      case "month":
        return (
          bookingDateObj.getMonth() === today.getMonth() &&
          bookingDateObj.getFullYear() === today.getFullYear()
        );
      case "year":
        return bookingDateObj.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  };

  const filterByTimeSlot = (bookingTime, slot) => {
    if (bookingTime === "--") return slot === "unscheduled";

    // This is a simple example - you can enhance based on your time format
    switch (slot) {
      case "morning":
        return (
          bookingTime.includes("AM") ||
          (bookingTime.includes("PM") && parseInt(bookingTime) === 12)
        );
      case "afternoon":
        return (
          bookingTime.includes("PM") &&
          parseInt(bookingTime) >= 1 &&
          parseInt(bookingTime) <= 5
        );
      case "evening":
        return bookingTime.includes("PM") && parseInt(bookingTime) >= 6;
      case "unscheduled":
        return bookingTime === "--";
      default:
        return true;
    }
  };
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      bookingType: "",
      dateRange: "",
      timeSlot: "",
      status: "",
    });
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };
  return (
    <Layout currentPage="bookings">
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
      {showFilterModal && (
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
              zIndex: 1060,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShowFilterModal(false)}
          >
            {/* Modal Content */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                width: "600px",
                maxHeight: "80vh",
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
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "28px",
                    padding: "20px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "100%",
                    textAlign: "center",
                    margin: 0,
                    color: "white",
                  }}
                >
                  🔍 Filter Bookings
                </div>
              </div>

              {/* Modal Body */}
              <div
                style={{
                  backgroundColor: "#EDF8F6",
                  padding: "30px",
                  position: "relative",
                  maxHeight: "60vh",
                  overflowY: "auto",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowFilterModal(false)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "20px",
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    color: "#000000",
                    cursor: "pointer",
                    zIndex: 1000,
                  }}
                >
                  ✕
                </button>

                {/* Booking Type Filter */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      fontWeight: "500",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Booking Type
                  </label>
                  <select
                    value={filters.bookingType}
                    onChange={(e) =>
                      handleFilterChange("bookingType", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">All Types</option>
                    <option value="Walk-In">Walk-In</option>
                    <option value="Online">Online</option>
                  </select>
                </div>

                {/* Date Range Filter */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      fontWeight: "500",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) =>
                      handleFilterChange("dateRange", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>

                {/* Time Slot Filter */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      fontWeight: "500",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Time Slot
                  </label>
                  <select
                    value={filters.timeSlot}
                    onChange={(e) =>
                      handleFilterChange("timeSlot", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">All Times</option>
                    <option value="morning">Morning (6AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 6PM)</option>
                    <option value="evening">Evening (6PM - 12AM)</option>
                    <option value="unscheduled">Unscheduled (--)</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      fontWeight: "500",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Active Filters Display */}
                {(filters.bookingType ||
                  filters.dateRange ||
                  filters.timeSlot ||
                  filters.status) && (
                  <div style={{ marginBottom: "20px" }}>
                    <small
                      style={{
                        color: "#666",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Active Filters:
                    </small>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                    >
                      {filters.bookingType && (
                        <span
                          style={{
                            backgroundColor: "#205EFA",
                            color: "white",
                            padding: "4px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                          }}
                        >
                          Type: {filters.bookingType}
                        </span>
                      )}
                      {filters.dateRange && (
                        <span
                          style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            padding: "4px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                          }}
                        >
                          Date: {filters.dateRange}
                        </span>
                      )}
                      {filters.timeSlot && (
                        <span
                          style={{
                            backgroundColor: "#ffc107",
                            color: "black",
                            padding: "4px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                          }}
                        >
                          Time: {filters.timeSlot}
                        </span>
                      )}
                      {filters.status && (
                        <span
                          style={{
                            backgroundColor: "#dc3545",
                            color: "white",
                            padding: "4px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                          }}
                        >
                          Status: {filters.status}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={clearFilters}
                    style={{
                      padding: "10px 20px",
                      fontWeight: "500",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    style={{
                      padding: "10px 20px",
                      fontWeight: "500",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#dc3545",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyFilters}
                    style={{
                      padding: "10px 30px",
                      fontWeight: "500",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#2857CC",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Apply Filters
                  </button>
                </div>
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
                onClick={() => setShowFilterModal(true)}
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
                {filteredBookings.map((booking, index) => (
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
