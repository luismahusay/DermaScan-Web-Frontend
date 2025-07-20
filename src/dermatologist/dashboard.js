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

const DermaScanDashboard = () => {
  const [active, setActive] = useState("dashboard"); // default to dashboard
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
                onClick={() => setActive("dashboard")}
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
                onClick={() => setActive("products")}
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
                onClick={() => setActive("bookings")}
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

          {/* Main Content */}
          <div className="flex-grow-1 main-content">
            <Container fluid>
              {/* Stats Cards */}
              <Row className="mb-2">
                <Col>
                  <h5
                    style={{
                      color: "#000", // Black text color
                      fontSize: "3rem", // Bigger font size (adjust as needed)
                      fontWeight: "bold",
                      display: "inline-block",
                      marginBottom: "16px", // Optional spacing below
                    }}
                  >
                    Dashboard
                  </h5>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={3} className="mb-3">
                  <div className="stat-card">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="stat-label">Today's Booking</div>
                        <div className="stat-number">0</div>
                        <div className="stat-change">
                          <i className="fas fa-arrow-up me-1"></i>
                          +% than last week
                        </div>
                      </div>
                      <div className="stat-icon">
                        <img
                          src="/icons/userstatsicon.png"
                          alt="Stat Icon"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={3} className="mb-3">
                  <div className="stat-card">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="stat-label">This month booking</div>
                        <div className="stat-number">0</div>
                        <div className="stat-change">
                          <i className="fas fa-arrow-up me-1"></i>
                          +% than last week
                        </div>
                      </div>
                      <div className="stat-icon">
                        <img
                          src="/icons/userstatsicon.png"
                          alt="Stat Icon"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Chart and Tables Row */}
              <Row className="mb-4">
                {/* Chart */}
                <Col md={6}>
                  <div className="chart-container">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Cancelled Bookings</h5>
                      <small className="text-muted">Last 6 months</small>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Monthly overview</small>
                    </div>
                    <div style={{ height: "300px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6c757d", fontSize: 12 }}
                          />
                          <YAxis
                            domain={[0, 8]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6c757d", fontSize: 12 }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#ff6b9d"
                            fill="rgba(255, 107, 157, 0.1)"
                            strokeWidth={2}
                            dot={{ fill: "#ff6b9d", strokeWidth: 2, r: 4 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Col>

                {/* Tables */}

                <Col md={6} style={{ marginTop: "-210px" }}>
                  {/* Pending Booking Requests */}
                  <div className="table-card">
                    <div className="table-header">
                      <div className="red-dot"></div>
                      Pending Booking Request
                    </div>
                    <Table responsive size="sm">
                      <thead>
                        <tr style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                          <th>Patient Name</th>
                          <th>Booking Type</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingData.map((booking, index) => (
                          <tr key={index}>
                            <td>{booking.patient}</td>
                            <td>
                              <span
                                className={`booking-type ${
                                  booking.type === "Online"
                                    ? "booking-online"
                                    : "booking-walkin"
                                }`}
                              >
                                {booking.type}
                              </span>
                            </td>
                            <td>{booking.time}</td>
                            <td>
                              <span className="status-badge">
                                {booking.status}
                              </span>
                            </td>
                            <td>
                              <a href="#" className="view-link">
                                View Booking...
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  {/* Product Summary */}
                  <div className="table-card">
                    <div className="table-header">
                      <div className="red-dot"></div>
                      Product Summary
                    </div>
                    <Table responsive size="sm">
                      <thead>
                        <tr style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                          <th>Patient Name</th>
                          <th>Booking Type</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {productData.map((product, index) => (
                          <tr key={index}>
                            <td>{product.patient}</td>
                            <td>
                              <span
                                className={`booking-type ${
                                  product.type === "Online"
                                    ? "booking-online"
                                    : "booking-walkin"
                                }`}
                              >
                                {product.type}
                              </span>
                            </td>
                            <td>{product.time}</td>
                            <td>
                              <span className="status-badge">
                                {product.status}
                              </span>
                            </td>
                            <td>
                              <a href="#" className="view-link">
                                View Product...
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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

export default DermaScanDashboard;
