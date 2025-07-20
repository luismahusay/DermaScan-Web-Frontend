import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ForgotPassword2() {
  const navigate = useNavigate();

  const [showPendingReview, setShowPendingReview] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleConfirmation = () => {
    setShowPendingReview(true);
  };

  const handleBack = () => {
    navigate("/forgotpassword"); // Assuming this is your email input screen
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 m-0">
        {/* Left Image */}
        <Col
          md={7}
          className="d-none d-md-block p-0"
          style={{
            backgroundImage: `url("/icons/background.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right Form Section */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column bg-white p-0"
          style={{
            width: "60%",
            maxWidth: "800px",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div
            className="text-white text-center w-100"
            style={{
              backgroundColor: "#2962FF",
              fontSize: "28px",
              fontWeight: "bold",
              padding: "20px 0",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
              minHeight: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3
              className="mb-0"
              style={{ fontWeight: "bold", fontSize: "50px" }}
            >
              Email Verification
            </h3>
          </div>

          {/* Main Content */}
          <div
            className="px-4 d-flex flex-column align-items-center"
            style={{ width: "100%", maxWidth: "400px", margin: "40px auto 0" }}
          >
            {/* Logos */}
            <div className="text-center mb-4">
              <img
                src="/icons/biggerlogodermascan.png"
                alt="DERMAScan Full Logo"
                style={{ width: "200px" }}
              />
            </div>

            <div className="text-center mb-5">
              <img
                src="/icons/DermaScan.png"
                alt="DERMAScan"
                style={{ width: "200px" }}
              />
            </div>

            {showPendingReview ? (
              <div
                className="text-center p-4 shadow-sm rounded"
                style={{ backgroundColor: "#f9f9f9", width: "100%" }}
              >
                <div className="mb-3">
                  <img
                    src="/icons/security_icon.png"
                    alt="Verified"
                    style={{ width: "60px" }}
                  />
                </div>
                <h5 className="fw-bold">Hi Doctor,</h5>
                <p className="text-muted small">
                  We will require your assistance as we work to establish a
                  robust security system. Please wait up to{" "}
                  <strong>24 hours</strong> for our administrator to examine
                  your background.
                </p>
                <div
                  className="badge border"
                  style={{
                    backgroundColor: "#E5E7EB",
                    color: "#6B7280",
                    fontSize: "13px",
                    padding: "6px 12px",
                  }}
                >
                  Status: Pending Admin Review
                </div>
              </div>
            ) : (
              <>
                {/* Text Instead of Icon */}
                <p
                  className="text-center mb-4"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Confirmation code sent in your email
                </p>

                {/* OTP Boxes */}
                <div
                  className="d-flex justify-content-between mb-2"
                  style={{ gap: "12px", width: "100%" }}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="form-control text-center"
                      style={{
                        width: "70px",
                        height: "70px",
                        fontSize: "28px",
                        borderRadius: "10px",
                        border: "2px solid #8F8E8E",
                      }}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>

                <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#6c757d", // gray text
                    }}
                  >
                    Code expires in{" "}
                    <span style={{ color: "#2962FF" /* blue color */ }}>
                      1:00
                    </span>
                  </span>
                </div>
                <div className="text-center mb-2" style={{ width: "100%" }}>
                  <span
                    className="text-danger"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                  >
                    Must be a four digit code
                  </span>
                </div>

                <div className="text-center mb-4" style={{ width: "100%" }}>
                  <span
                    style={{
                      textDecoration: "underline",
                      color: "#2962FF",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Resend Code
                  </span>
                </div>

                {/* Reset Password Button */}
                <Button
                  onClick={handleConfirmation}
                  style={{
                    width: "100%",
                    backgroundColor: "#2962FF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "15px 0",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: "16px",
                  }}
                >
                  Reset Password
                </Button>

                {/* Back to Email */}
                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    onClick={handleBack}
                    style={{
                      color: "#2962FF",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    ← Back to email
                  </Button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword2;
