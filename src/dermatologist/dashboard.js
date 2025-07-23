import React, { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis } from "recharts";
import { Layout } from "./Layout";

const DermaDashboard = () => {
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
  return (
    <Layout currentPage="dashboard">
      <style jsx>{`
        .stat-card {
          background: white;
          border: 1px solid #205efa;
          border-radius: 16px;
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
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid #205efa;
        }
        .table-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid #205efa;
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
        .red-dot {
          width: 12px;
          height: 12px;
          background-color: #dc3545;
          border-radius: 50%;
          margin-right: 8px;
        }
        @media (max-width: 576px) {
          /* Stack stat cards vertically on mobile */
          .stat-card {
            margin-bottom: 15px;
          }

          /* Adjust font sizes for mobile */
          .stat-number {
            font-size: 2rem;
          }

          /* Hide chart on very small screens or make it smaller */
          .chart-container {
            height: 250px;
          }

          /* Make tables horizontally scrollable */
          .table-card {
            overflow-x: auto;
          }

          /* Adjust dashboard title */
          h5 {
            fontsize: "2rem" !important;
          }
        }
        @media (max-width: 768px) {
          /* Stack chart and tables vertically on tablets */
          .chart-tables-row {
            flex-direction: column;
          }

          /* Remove negative margin for tables on mobile */
          .tables-column {
            margin-top: 0 !important;
          }

          /* Adjust padding for mobile */
          .stat-card,
          .chart-container,
          .table-card {
            padding: 16px;
          }
        }

        @media (max-width: 992px) {
          /* Adjust layout for medium screens */
          .main-content {
            padding: 15px;
          }
        }
      `}</style>
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
          <Col xs={12} sm={6} md={3} className="mb-3">
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

          <Col xs={12} sm={6} md={3} className="mb-3">
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
        <Row className="mb-4 chart-tables-row">
          {/* Chart */}
          <Col md={6} lg={6} xl={6}>
            <div className="chart-container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Cancelled Bookings</h5>
                <small className="text-muted">Last 6 months</small>
              </div>
              <div className="mb-2">
                <small className="text-muted">Monthly overview</small>
              </div>
              <div
                style={{ height: window.innerWidth < 768 ? "250px" : "300px" }}
              >
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

          <Col
            md={6}
            lg={6}
            xl={6}
            className="tables-column"
            style={{ marginTop: "-210px" }}
          >
            {/* Pending Booking Requests */}
            <div className="table-card">
              <div className="table-header">
                <div className="red-dot"></div>
                Pending Booking Request
              </div>
              <div className="table-responsive">
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
                          <span className="status-badge">{booking.status}</span>
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
            </div>

            {/* Product Summary */}
            <div className="table-card">
              <div className="table-header">
                <div className="red-dot"></div>
                Product Summary
              </div>
              <div className="table-responsive">
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
                          <span className="status-badge">{product.status}</span>
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
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default DermaDashboard;