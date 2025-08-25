import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/derma_forgot_password.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    resetPasswordWithFirebase,
    verifyPasswordResetOTP,
    sendPasswordResetOTP,
    updateUserPassword, // Add this line if you plan to use the password update flow
  } = useAuth();

  const [email] = useState(location.state?.email || "");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1); // Add this line
  const [newPassword, setNewPassword] = useState(""); // Add this line
  const [confirmPassword, setConfirmPassword] = useState(""); // Add this line
  // Redirect if no email is provided
  useEffect(() => {
    if (!email) {
      navigate("/dermatologist/forgot-password");
    }
  }, [email, navigate]);

  const handleVerifyOTP = async () => {
    if (otp.join("").trim() === "") {
      setError("Please enter the OTP");
      return;
    }

    if (otp.join("").length !== 4) {
      setError("OTP must be 4 digits");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await verifyPasswordResetOTP(email, otp.join(""));
      setSuccess("OTP verified successfully!");
      setStep(2);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await updateUserPassword(email, otp.join(""), newPassword);
      setSuccess("Password reset successfully! Redirecting to login...");

      // Navigate to login after a short delay
      setTimeout(() => {
        navigate("/dermatologist/derma_login");
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };
  const handleBackToLogin = () => {
    navigate("/dermatologist/derma_login");
  };

  const handleBackToForgotPassword = () => {
    navigate("/dermatologist/forgot-password");
  };

  return (
    <Container fluid className="vh-100 d-flex">
      <Row className="flex-grow-1 w-100 m-0 h-100">
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
          className="d-flex flex-column justify-content-start bg-white vh-auto overflow-auto p-0"
        >
          {/* Header */}
          <div
            className="text-white text-center w-100 mb-4"
            style={{
              backgroundColor: "#2962FF",
              fontSize: "28px",
              fontWeight: "bold",
              padding: "20px 0",
              borderRadius: "0 0 20px 20px",
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3 className="mb-0" style={{ fontSize: "38px" }}>
              {step === 1 ? "Verify OTP" : "New Password"}
            </h3>
          </div>

          {/* Logos */}
          <div className="text-center d-flex flex-column align-items-center mb-4">
            <img
              src="/icons/biggerlogodermascan.png"
              alt="DERMAScan Logo"
              style={{ width: "9rem" }}
            />
            <img
              src="/icons/DermaScan.png"
              alt="DERMAScan Text"
              style={{ width: "8rem" }}
            />
          </div>

          {/* Instruction */}
          <p
            className="text-center text-muted mb-4 fw-semibold"
            style={{ fontSize: "0.9rem" }}
          >
            {step === 1
              ? `Please enter the OTP sent to ${email}`
              : "Please enter your new password"}
          </p>

          {/* Success/Error Messages */}
          {error && (
            <Alert variant="danger" className="mx-4 mb-3">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mx-4 mb-3">
              {success}
            </Alert>
          )}

          {/* Form */}
          <Form className="d-flex flex-column align-items-center justify-content-center">
            {step === 1 ? (
              // OTP Verification Step
              <>
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
                      disabled={loading}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="mb-3 d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#2962FF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 0",
                    fontWeight: "bold",
                    fontSize: "16px",
                    width: "20rem",
                  }}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </>
            ) : (
              // New Password Step
              <>
                <Form.Group controlId="formNewPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-0 border-bottom rounded-0 ps-0 pe-3"
                    style={{ boxShadow: "none", width: "20rem" }}
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-0 border-bottom rounded-0 ps-0 pe-3"
                    style={{ boxShadow: "none", width: "20rem" }}
                    disabled={loading}
                  />
                </Form.Group>

                <Button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="mb-3 d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#2962FF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 0",
                    fontWeight: "bold",
                    fontSize: "16px",
                    width: "20rem",
                  }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </>
            )}
          </Form>

          {/* Back Navigation */}
          <div className="text-center mt-3">
            {step === 1 ? (
              <Button
                variant="link"
                onClick={handleBackToForgotPassword}
                className="back-login"
                disabled={loading}
              >
                ← Back to forgot password
              </Button>
            ) : (
              <Button
                variant="link"
                onClick={handleBackToLogin}
                className="back-login"
                disabled={loading}
              >
                ← Back to log in
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
