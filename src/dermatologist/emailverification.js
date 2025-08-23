import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ Import your AuthContext
import "../styles/email_verification.css";

function EmailVerification() {
  const navigate = useNavigate();
  const { verifyOTP, currentUser, sendOTP } = useAuth();
  const [showPendingReview, setShowPendingReview] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleConfirmation = async () => {
    setError("");
    setLoading(true);

    try {
      const code = otp.join(""); // join ["1","2","3","4"] → "1234"
      await verifyOTP(currentUser?.email, code); // ✅ call verifyOTP
      setShowPendingReview(true); // show pending screen
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleResendOTP = async () => {
    setResendLoading(true);
    setError("");

    try {
      await sendOTP(currentUser?.email);
      setSuccessMessage("New OTP sent!");
      setOtp(["", "", "", ""]);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };
  const handleLogin = () => {
    navigate("/dermatologist/derma_login");
  };

  return (
    <Container fluid className="vh-100 p-0 ">
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

        {/* Right Form */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column bg-white overflow-auto p-0"
        >
          {/* Header */}
          <div className="bg-primary text-white text-center py-4 px-0 rounded-bottom-5">
            <h3 className="fw-bold fs-2 mb-0">Email Verification</h3>
          </div>

          {/* Content */}
          <div
            className="py-4 px-5 mx-auto w-100"
            style={{ maxWidth: "400px" }}
          >
            {/* Logos */}
            <div className="text-center mb-4 d-flex flex-column align-items-center justify-content-center">
              <img
                src="/icons/biggerlogodermascan.png"
                alt="Logo"
                className="img-fluid mb-3"
                style={{ maxWidth: "200px" }}
              />
              <img
                src="/icons/DermaScan.png"
                alt="DERMAScan"
                className="img-fluid"
                style={{ maxWidth: "200px" }}
              />
            </div>

            {showPendingReview ? (
              // PENDING REVIEW SCREEN
              <div className="text-center p-4 bg-light rounded shadow-sm">
                <img
                  src="/icons/security_icon.png"
                  alt="Verified"
                  className="mb-3"
                  style={{ width: "60px" }}
                />
                <h5 className="fw-bold">Hi Doctor,</h5>
                <p className="text-muted small">
                  We will require your assistance as we work to establish a
                  robust security system. Please wait up to{" "}
                  <strong>24 hours</strong> for our administrator to examine
                  your background.
                </p>
                <span className="badge text-secondary bg-secondary-subtle py-2 px-3">
                  Status: Pending Admin Review
                </span>
                 <div className="mt-3">
                  <Button
                    variant="link"
                    onClick={handleLogin}
                    className="p-0 text-primary fw-semibold"
                  >
                    ← Back to log in
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Mail Icon */}
                <div className="text-center mb-3">
                  <img
                    src="/icons/mailicon.png"
                    alt="Mail Icon"
                    className="img-fluid"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>

                <p className="text-center text-muted mb-4">
                  Your email has been sent an OTP. Kindly input the OTP code
                  provided below.
                </p>

                {/* OTP Inputs */}
                <div className="d-flex justify-content-center gap-3 mb-4">
                  {otp.map((digit, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="text-center fs-4 fw-bold"
                      style={{
                        width: "65px",
                        height: "60px",
                        backgroundColor: "#a2a8aeff",
                      }}
                    />
                  ))}
                </div>
                {successMessage && (
                  <p className="text-success text-center small mb-3">
                    {successMessage}
                  </p>
                )}
                {error && (
                  <p className="text-danger text-center small mb-3">{error}</p>
                )}

                <div className="confirmation-button d-flex align-items-center justify-content-center mb-2">
                  <Button
                    onClick={handleConfirmation}
                    className="w-100 mb-3 text-uppercase fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Confirmation"}
                  </Button>
                </div>

                <div className="mb-3 d-flex align-items-center justify-content-center gap-2">
                  <span className="text-muted small">
                    Didn't receive the email?{" "}
                  </span>
                  <Button
                    variant="link"
                    onClick={handleResendOTP}
                    disabled={resendLoading}
                    className="p-0 fw-semibold text-center"
                  >
                    {resendLoading ? "Sending..." : "Click to resend"}
                  </Button>
                </div>

                <div className="back-login d-flex justify-content-center">
                  <Button
                    variant="link"
                    onClick={handleLogin}
                    className="p-0 text-primary fw-semibold login-back"
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
