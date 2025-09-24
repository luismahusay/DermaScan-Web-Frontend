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
import "../styles/derma_subscription.css"; // Assuming you have a CSS file for styles

const DermaSubscription = () => {

  return (
    <Layout currentPage="subscription">

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
