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
} from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const DermaSubscription = () => {
  const [active, setActive] = useState("subscription"); // default to dashboard
  const [hovered, setHovered] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample data for the chart
  const chartData = [
    { month: "Jan", value: 4 },
    { month: "Feb", value: 6 },
    { month: "Mar", value: 3 },
    { month: "Apr", value: 7 },
    { month: "May", value: 5 },
    { month: "Jun", value: 2 },
  ];

  // Sample booking data
  const bookingData = [
    { patient: "Test", type: "Online", time: "9:00 AM", status: "Accepted" },
    { patient: "Test", type: "Walk-In", time: "1:00 PM", status: "Accepted" },
    { patient: "Test", type: "Walk-In", time: "4:30 PM", status: "Accepted" },
    { patient: "Test", type: "Online", time: "6:00 PM", status: "Accepted" },
    { patient: "Test", type: "Online", time: "7:00 PM", status: "Accepted" },
  ];

  const productData = [
    { patient: "Test", type: "Online", time: "9:00 AM", status: "Accepted" },
    { patient: "Test", type: "Walk-In", time: "1:00 PM", status: "Accepted" },
    { patient: "Test", type: "Walk-In", time: "4:30 PM", status: "Accepted" },
    { patient: "Test", type: "Online", time: "6:00 PM", status: "Accepted" },
    { patient: "Test", type: "Online", time: "7:00 PM", status: "Accepted" },
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

  return (
    <>
      <style jsx>{`
        @media (min-width: 768px) {
          .main-content {
            margin-left: 50px !important; /* Override the 220px */
            width: calc(
              100vw - 250px
            ) !important; /* Account for 250px sidebar */
          }
        }
        .admin-sidebar {
          width: 250px !important; /* Match your React component */
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
        .sidebar-item .sidebar-icon {
          width: 18px;
          height: 18px;
          transition: all 0.3s ease;
        }
        .sidebar-item:hover {
          background-color: #205efa;
          color: white;
        }
        .stat-card {
          background: white;
          border: 1px solid #205efa; /* Thicker blue border */
          border-radius: 16px; /* More rounded corners */
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          height: 100%;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 8px;
        }
        .stat-label {
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 12px;
        }
        .stat-change {
          font-size: 0.85rem;
          font-weight: 600;
          color: #28a745;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          background-color: #007bff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
        }
        .chart-container {
          background: white;
          border-radius: 16px; /* More rounded corners */
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid #205efa; /* Blue border */
        }
        .table-card {
          background: white;
          border-radius: 16px; /* More rounded corners */
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid #205efa; /* Blue border */
          margin-bottom: 20px;
        }
        .table-header {
          font-weight: 600;
          color: #212529;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          background-color: #d4edda;
          color: #155724;
        }
        .booking-type {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .booking-online {
          background-color: #e3f2fd;
          color: #1976d2;
        }
        .booking-walkin {
          background-color: #fff3e0;
          color: #f57c00;
        }
        .view-link {
          color: #007bff;
          text-decoration: none;
          font-size: 0.85rem;
        }
        .view-link:hover {
          text-decoration: underline;
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
        .red-dot {
          width: 12px;
          height: 12px;
          background-color: #dc3545;
          border-radius: 50%;
          margin-right: 8px;
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
        .brand-icon {
          width: 32px;
          height: 32px;
          background-color: #007bff;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 12px;
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
          box-shadow: 0 0 0 0.2rem rgba(32, 94, 250, 0.25); /* subtle blue glow */
          border-color: #205efa;
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
          background-color: #e8f0fe; /* light blue background */
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

        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background-color: #dc3545;
          border-radius: 50%;
        }
        .subscription-card {
          width: 100% !important;
          max-width: none !important;
          background: white;
          border: 1px solid #e0e7ff;
          border-radius: 16px;
          padding: 40px 30px;
          text-align: center;
          min-height: calc(100vh - 200px);
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }
        .subscription-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .subscription-features {
          flex-grow: 1;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center the features vertically */
        }

        .subscription-card:hover {
          transform: translateY(-5px);
        }

        .subscription-card-featured {
          background: #4f46e5;
          color: white;
          transform: scale(1.05);
          border: none;
        }

        .subscription-icon {
          width: 60px;
          height: 60px;
          border: 2px solid #6b7280;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 24px;
          font-weight: bold;
          color: #6b7280;
        }

        .subscription-icon-featured {
          border-color: white;
          color: white;
        }

        .subscription-price {
          font-size: 3rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .subscription-price-featured {
          color: white;
        }

        .subscription-plan-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 32px;
          letter-spacing: 0.5px;
        }

        .subscription-plan-featured {
          color: #e0e7ff;
        }

        .subscription-features {
          flex-grow: 1;
          margin-bottom: 32px;
        }

        .subscription-feature {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          text-align: left;
        }

        .subscription-feature-featured {
          color: white;
        }

        .subscription-check {
          color: #10b981;
          margin-right: 12px;
          margin-top: 2px;
          font-size: 14px;
        }

        .subscription-check-featured {
          color: #a7f3d0;
        }

        .subscription-feature span {
          font-size: 14px;
          line-height: 1.4;
        }

        .subscription-btn {
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 15px 32px;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.3s ease;
          width: 80%;
          margin: 0 auto; /* This centers the button */
          display: block; /* Ensures margin auto works */
        }

        .subscription-btn:hover {
          background: #4338ca;
        }

        .subscription-btn-featured {
          background: white;
          color: #4f46e5;
        }

        .subscription-btn-featured:hover {
          background: #f8fafc;
        }

        .subscription-btn-free {
          background: #4f46e5;
          color: white;
        }

        .subscription-btn-free:hover {
          background: #4338ca;
        }
      `}</style>

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
                  setActive("dashboard");
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
                  setActive("products");
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
                  setActive("bookings");
                  window.location.href = "bookings"; // Change to your actual file names
                }}
                onMouseEnter={() => setHovered("bookings")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/bookingsicon-${
                    hovered === "bookings" ? "white" : "blue"
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
                onClick={(e) => {
                  e.preventDefault();
                  setActive("patients");
                  window.location.href = "acceptedpatients"; // Change to your actual file names
                }}
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
                onClick={(e) => {
                  e.preventDefault();
                  setActive("subscription");
                  window.location.href = "subscription"; // Change to your actual file names
                }}
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

          {/* Main Content */}
          <div
            className="flex-grow-1 main-content d-flex flex-column"
            style={{
              marginTop: "-70px",
              marginLeft: "-50px",
              minHeight: "100vh",
            }}
          >
            <Container fluid>
              {/* Page Title */}

              {/* Subscription Plans */}
              <Row
                className="justify-content-center gx-4"
                style={{
                  maxWidth: "15000px",
                  margin: "0 auto",
                  padding: "0px 40px",
                }}
              >
                {/* Free Plan */}
                <Col lg={4} md={6} sm={12} className="mb-4">
                  <div className="subscription-card">
                    <div className="subscription-icon">
                      <span>$</span>
                    </div>
                    <div className="subscription-price">₱ 0.00</div>
                    <div className="subscription-plan-name">FREE PLAN</div>

                    <div className="subscription-features">
                      <div className="subscription-feature">
                        <i className="fas fa-check subscription-check"></i>
                        <span>Add up to 5 skincare products</span>
                      </div>
                      <div className="subscription-feature">
                        <i className="fas fa-check subscription-check"></i>
                        <span>Accept up to 5 patient bookings</span>
                      </div>
                    </div>

                    <button className="subscription-btn subscription-btn-free">
                      SUBSCRIBE
                    </button>
                  </div>
                </Col>

                {/* Monthly Plan */}
                <Col lg={4} md={6} sm={12} className="mb-4">
                  <div className="subscription-card subscription-card-featured">
                    <div className="subscription-icon subscription-icon-featured">
                      <span>$</span>
                    </div>
                    <div className="subscription-price subscription-price-featured">
                      ₱ 120.00
                    </div>
                    <div className="subscription-plan-name subscription-plan-featured">
                      MONTHLY PLAN
                    </div>

                    <div className="subscription-features">
                      <div className="subscription-feature subscription-feature-featured">
                        <i className="fas fa-check subscription-check subscription-check-featured"></i>
                        <span>Unlimited upload for skincare products</span>
                      </div>
                      <div className="subscription-feature subscription-feature-featured">
                        <i className="fas fa-check subscription-check subscription-check-featured"></i>
                        <span>Unlimited in accepting patient bookings</span>
                      </div>
                    </div>

                    <button className="subscription-btn subscription-btn-featured">
                      SUBSCRIBE
                    </button>
                  </div>
                </Col>

                {/* Yearly Plan */}
                <Col lg={4} md={6} sm={12} className="mb-4">
                  <div className="subscription-card">
                    <div className="subscription-icon">
                      <span>$</span>
                    </div>
                    <div className="subscription-price">₱ 1,400.00</div>
                    <div className="subscription-plan-name">YEARLY PLAN</div>

                    <div className="subscription-features">
                      <div className="subscription-feature">
                        <i className="fas fa-check subscription-check"></i>
                        <span>Unlimited upload for skincare products</span>
                      </div>
                      <div className="subscription-feature">
                        <i className="fas fa-check subscription-check"></i>
                        <span>Unlimited in accepting patient bookings</span>
                      </div>
                    </div>

                    <button className="subscription-btn subscription-btn-free">
                      SUBSCRIBE
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default DermaSubscription;
