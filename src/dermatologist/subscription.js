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
import {Layout} from "./Layout";

const DermaSubscription = () => {

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
    <Layout currentPage="subscription">
      <style jsx>{`
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
        /* Tablet adjustments */
        @media (max-width: 992px) {
          .subscription-container {
            padding: 30px 15px;
          }

          .subscription-card {
            padding: 30px 25px;
            min-height: auto;
          }

          .subscription-price {
            font-size: 2.5rem;
          }
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .subscription-container {
            padding: 20px 10px;
          }

          .subscription-card {
            padding: 25px 20px;
            margin-bottom: 20px;
          }

          .subscription-card-featured {
            transform: scale(1); /* Remove scale on mobile */
          }

          .subscription-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
            margin-bottom: 20px;
          }

          .subscription-price {
            font-size: 2rem;
          }

          .subscription-plan-name {
            font-size: 0.8rem;
            margin-bottom: 24px;
          }

          .subscription-feature span {
            font-size: 13px;
          }

          .subscription-btn {
            width: 90%;
            padding: 12px 24px;
            font-size: 13px;
          }
        }

        /* Small mobile adjustments */
        @media (max-width: 576px) {
          .subscription-card {
            padding: 20px 15px;
          }

          .subscription-price {
            font-size: 1.8rem;
          }

          .subscription-btn {
            width: 100%;
            padding: 14px 20px;
          }

          .subscription-feature {
            margin-bottom: 12px;
          }
        }

        /* Container row adjustment for mobile */
        @media (max-width: 768px) {
          .row.justify-content-center {
            padding: 0 20px !important;
          }
        }
      `}</style>

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
    </Layout>
  );
};

export default DermaSubscription;
