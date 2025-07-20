import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";

function EmailVerification() {
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
    setShowPendingReview(true); // UI switch only
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 m-0">
        {/* Left image section */}
        <Col
          md={7}
          className="d-none d-md-block p-0"
          style={{
            backgroundImage: `url("/icons/background.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right form section */}
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
          {/* Blue Header */}
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

          {/* Form Content */}
          <div
            className="px-4 d-flex flex-column align-items-center"
            style={{ width: "100%", maxWidth: "400px", margin: "40px auto 0" }}
          >
            {/* BIG LOGO above */}
            <div className="text-center" style={{ marginBottom: "30px" }}>
              <img
                src="/icons/biggerlogodermascan.png"
                alt="DERMAScan Full Logo"
                style={{ width: "200px" }} // You can adjust width here
              />
            </div>

            {/* Logo */}
            <div className="text-center" style={{ marginBottom: "40px" }}>
              <img
                src="/icons/DermaScan.png"
                alt="DERMAScan"
                style={{ width: "200px" }}
              />
            </div>

            {showPendingReview ? (
              // === Second Screen: Pending Admin Review ===
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
              // === First Screen: OTP Input ===
              <>
                <div className="text-center mb-3">
                  <img
                    src="/icons/mailicon.png" // 🔁 Replace with your actual icon path
                    alt="Mail Icon"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginBottom: "0px",
                    }}
                  />
                </div>
                <p className="text-center text-muted mb-4">
                  Your email has been sent an OTP. Kindly input the OTP code
                  provided below.
                </p>

                <div
                  className="d-flex justify-content-between mb-4"
                  style={{ gap: "12px" }}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="form-control text-center"
                      style={{
                        width: "70px", // Increased width
                        height: "70px", // Increased height
                        fontSize: "28px", // Bigger text
                        borderRadius: "10px", // Slightly more rounded corners
                        border: "2px solid #8F8E8E", // Updated border color
                      }}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>

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
                  Confirmation
                </Button>

                <div className="text-center mt-3">
                  <span className="text-muted small">
                    Didn't receive the email?{" "}
                  </span>
                  <Button
                    variant="link"
                    className="p-0"
                    style={{
                      color: "#2962FF",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Click to resend
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    onClick={handleLogin}
                    style={{
                      color: "#2962FF",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    ← Back to log in
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

export default EmailVerification;
