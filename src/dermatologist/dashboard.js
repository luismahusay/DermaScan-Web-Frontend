import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis } from "recharts";
import { Layout } from "./Layout";
import "../styles/derma_dashboard.css"; // Import your CSS styles
import { useNavigate } from "react-router-dom";
import { useProduct } from "../contexts/ProductContext";
import { useAuth } from "../contexts/AuthContext";
const DermaDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("6months");
  const [screenSize, setScreenSize] = useState("desktop");
  const { currentUser, loading: authLoading } = useAuth();
  const { products, loading: productLoading, getProducts } = useProduct();
  const navigate = useNavigate();
  // Monitor screen size changes for chart responsiveness
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 576) setScreenSize("mobile");
      else if (width < 768) setScreenSize("large-mobile");
      else if (width < 992) setScreenSize("tablet");
      else if (width < 1200) setScreenSize("small-desktop");
      else setScreenSize("desktop");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);
  useEffect(() => {
    const loadProductsWhenReady = async () => {
      if (authLoading || !currentUser?.uid) return;

      try {
        await getProducts({
          dermatologistId: currentUser.uid,
        });
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProductsWhenReady();
  }, [currentUser?.uid, authLoading]);
  // Dynamic chart configuration based on screen size
  const getChartConfig = () => {
    const configs = {
      mobile: {
        fontSize: 10,
        strokeWidth: 1.5,
        dotRadius: 2.5,
        tickCount: 4,
        margin: { top: 5, right: 5, left: 0, bottom: 5 },
        yAxisWidth: 20,
        showAllTicks: false,
      },
      "large-mobile": {
        fontSize: 11,
        strokeWidth: 1.5,
        dotRadius: 3,
        tickCount: 5,
        margin: { top: 8, right: 8, left: 5, bottom: 8 },
        yAxisWidth: 25,
        showAllTicks: false,
      },
      tablet: {
        fontSize: 11,
        strokeWidth: 2,
        dotRadius: 3.5,
        tickCount: 6,
        margin: { top: 10, right: 10, left: 8, bottom: 10 },
        yAxisWidth: 30,
        showAllTicks: true,
      },
      "small-desktop": {
        fontSize: 12,
        strokeWidth: 2,
        dotRadius: 4,
        tickCount: 6,
        margin: { top: 15, right: 15, left: 10, bottom: 15 },
        yAxisWidth: 35,
        showAllTicks: true,
      },
      desktop: {
        fontSize: 12,
        strokeWidth: 2,
        dotRadius: 4,
        tickCount: 6,
        margin: { top: 20, right: 30, left: 15, bottom: 20 },
        yAxisWidth: 40,
        showAllTicks: true,
      },
    };
    return configs[screenSize] || configs.desktop;
  };

  const chartConfig = getChartConfig();

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

  const recentProducts = products.slice(0, 5);

  return (
    <Layout currentPage="dashboard">
      <Container fluid>
        {/* Stats Cards */}
        <Row className="mb-2">
          <Col>
            <h5
              style={{
                color: "#000",
                fontSize:
                  screenSize === "mobile"
                    ? "2rem"
                    : screenSize === "large-mobile"
                    ? "2.2rem"
                    : screenSize === "tablet"
                    ? "2.5rem"
                    : "3rem",
                fontWeight: "bold",
                display: "inline-block",
                marginBottom: "16px",
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
                    style={{
                      width: screenSize === "mobile" ? "20px" : "24px",
                      height: screenSize === "mobile" ? "20px" : "24px",
                    }}
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
                    style={{
                      width: screenSize === "mobile" ? "20px" : "24px",
                      height: screenSize === "mobile" ? "20px" : "24px",
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Chart and Tables Row */}
        <Row className="mb-4 chart-tables-row">
          {/* Responsive Chart */}
          <Col md={6} lg={6} xl={6}>
            <div className="chart-container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5
                  className="mb-0"
                  style={{
                    fontSize:
                      screenSize === "mobile"
                        ? "1rem"
                        : screenSize === "large-mobile"
                        ? "1.1rem"
                        : "1.25rem",
                  }}
                >
                  Cancelled Bookings
                </h5>
                <select
                  className="filter-dropdown"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  style={{
                    fontSize:
                      screenSize === "mobile"
                        ? "0.7rem"
                        : screenSize === "large-mobile"
                        ? "0.75rem"
                        : "0.8rem",
                    padding: screenSize === "mobile" ? "2px 4px" : "4px 8px",
                  }}
                >
                  <option value="6months">Last 6 months</option>
                  <option value="3months">Last 3 months</option>
                  <option value="1month">Last month</option>
                  <option value="1year">Last year</option>
                </select>
              </div>
              <div className="mb-2">
                <small
                  className="text-muted"
                  style={{
                    fontSize: screenSize === "mobile" ? "0.7rem" : "0.8rem",
                  }}
                >
                  Monthly overview
                </small>
              </div>
              <div
                style={{
                  height: "calc(100% - 80px)",
                  minHeight:
                    screenSize === "mobile"
                      ? "150px"
                      : screenSize === "large-mobile"
                      ? "180px"
                      : "200px",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={chartConfig.margin}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#6c757d",
                        fontSize: chartConfig.fontSize,
                        textAnchor: "middle",
                      }}
                      interval={
                        chartConfig.showAllTicks ? 0 : "preserveStartEnd"
                      }
                      height={screenSize === "mobile" ? 20 : 30}
                    />
                    <YAxis
                      domain={[0, 8]}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#6c757d",
                        fontSize: chartConfig.fontSize,
                      }}
                      width={chartConfig.yAxisWidth}
                      tickCount={screenSize === "mobile" ? 4 : 5}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#ff6b9d"
                      fill="rgba(255, 107, 157, 0.1)"
                      strokeWidth={chartConfig.strokeWidth}
                      dot={{
                        fill: "#ff6b9d",
                        strokeWidth: chartConfig.strokeWidth,
                        r: chartConfig.dotRadius,
                      }}
                      activeDot={{
                        r: chartConfig.dotRadius + 1,
                        stroke: "#ff6b9d",
                        strokeWidth: 2,
                        fill: "#ff6b9d",
                      }}
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
            style={{
              marginTop:
                screenSize === "tablet" ||
                screenSize === "mobile" ||
                screenSize === "large-mobile"
                  ? "0"
                  : "-210px",
            }}
          >
            {/* Pending Booking Requests */}
            <div className="table-card">
              <div className="table-header">
                <div className="red-dot"></div>
                <span
                  style={{
                    fontSize:
                      screenSize === "mobile"
                        ? "0.85rem"
                        : screenSize === "large-mobile"
                        ? "0.9rem"
                        : "1rem",
                  }}
                >
                  Pending Booking Request
                </span>
              </div>
              <div className="table-responsive">
                <Table responsive size="sm">
                  <thead>
                    <tr
                      style={{
                        fontSize:
                          screenSize === "mobile" ? "0.75rem" : "0.85rem",
                        color: "#6c757d",
                      }}
                    >
                      <th>Patient Name</th>
                      <th>Booking Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingData.map((booking, index) => (
                      <tr
                        key={index}
                        style={{
                          fontSize:
                            screenSize === "mobile" ? "0.75rem" : "0.85rem",
                        }}
                      >
                        <td>{booking.patient}</td>
                        <td>
                          <span
                            className={`booking-type ${
                              booking.type === "Online"
                                ? "booking-online"
                                : "booking-walkin"
                            }`}
                            style={{
                              fontSize:
                                screenSize === "mobile" ? "0.7rem" : "0.8rem",
                            }}
                          >
                            {booking.type}
                          </span>
                        </td>
                        <td>{booking.time}</td>
                        <td>
                          <span
                            className="status-badge"
                            style={{
                              fontSize:
                                screenSize === "mobile" ? "0.7rem" : "0.8rem",
                            }}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <a
                            href="#"
                            className="view-link"
                            style={{
                              fontSize:
                                screenSize === "mobile" ? "0.75rem" : "0.85rem",
                            }}
                          >
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
                <span
                  style={{
                    fontSize:
                      screenSize === "mobile"
                        ? "0.85rem"
                        : screenSize === "large-mobile"
                        ? "0.9rem"
                        : "1rem",
                  }}
                >
                  Product Summary
                </span>
              </div>
              <div className="table-responsive">
                <Table responsive size="sm">
                  <thead>
                    <tr
                      style={{
                        fontSize:
                          screenSize === "mobile" ? "0.75rem" : "0.85rem",
                        color: "#6c757d",
                      }}
                    >
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Date Created</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                 <tbody>
  {productLoading ? (
    <tr>
      <td colSpan="5" className="text-center">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </td>
    </tr>
  ) : recentProducts.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center text-muted">
        No products found
      </td>
    </tr>
  ) : (
    recentProducts.map((product, index) => (
      <tr
        key={product.Product_ID}
        style={{
          fontSize: screenSize === "mobile" ? "0.75rem" : "0.85rem",
        }}
      >
        <td>{product.Product_Name}</td>
        <td>
          <span
            className="booking-type booking-online"
            style={{
              fontSize: screenSize === "mobile" ? "0.7rem" : "0.8rem",
            }}
          >
            {product.Product_Category}
          </span>
        </td>
        <td>
          {product.Product_DateCreated
            ? new Date(product.Product_DateCreated).toLocaleDateString()
            : "N/A"}
        </td>
        <td>
          <span
            className="status-badge"
            style={{
              fontSize: screenSize === "mobile" ? "0.7rem" : "0.8rem",
            }}
          >
            Active
          </span>
        </td>
        <td>
          <a
            href="#"
            className="view-link"
            style={{
              fontSize: screenSize === "mobile" ? "0.75rem" : "0.85rem",
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate('/dermatologist/productmanagement');
            }}
          >
            View Product...
          </a>
        </td>
      </tr>
    ))
  )}
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
