import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { RegistrationContext } from "../contexts/RegistrationContext";
import "../styles/derma_security.css";

function SecurityRegister() {
  const navigate = useNavigate();
  const { registerDermatologist } = useAuth();
  const { personalInfo, verificationInfo } = useContext(RegistrationContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleRegister = async () => {
    // Validation
    const validationErrors = {};

    const passwordError = validatePassword(password);
    if (passwordError) validationErrors.password = passwordError;

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setError(""); // Clear general error when showing field-specific errors
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFieldErrors({}); // Clear field errors on successful validation

      await registerDermatologist(personalInfo, verificationInfo, password);

      navigate("/dermatologist/emailverification");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
      setFieldErrors({}); // Clear field errors when showing server error
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    return null;
  };

  const handleLogin = () => {
    navigate("/dermatologist/derma_login");
  };

  // Clear field errors when user starts typing
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (fieldErrors.password) {
      setFieldErrors((prev) => ({ ...prev, password: null }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (fieldErrors.confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
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
        <Col xs={12} md={5} className="form-section d-flex flex-column p-0">
          {/* Blue Header */}
          <div className="header-section">
            <h3>Set up Security</h3>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="form-container">
            <div className="text-center mb-5">
              <img
                src="/icons/DermaScan.png"
                alt="DERMAScan Text"
                className="form-logo"
              />
            </div>

            <Form className="w-100">
              {/* Password Field */}
              <Form.Group className="mb-4 position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`input-field pe-5 ${
                    fieldErrors.password ? "is-invalid" : ""
                  }`}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(false)}
                    className="eye-icon"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(true)}
                    className="eye-icon"
                  />
                )}
                {fieldErrors.password && (
                  <div className="invalid-feedback d-block">
                    {fieldErrors.password}
                  </div>
                )}
              </Form.Group>

              {/* Confirm Password Field */}
              <Form.Group className="mb-4 position-relative">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`input-field pe-5 ${
                    fieldErrors.confirmPassword ? "is-invalid" : ""
                  }`}
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowConfirmPassword(false)}
                    className="eye-icon"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowConfirmPassword(true)}
                    className="eye-icon"
                  />
                )}
                {fieldErrors.confirmPassword && (
                  <div className="invalid-feedback d-block">
                    {fieldErrors.confirmPassword}
                  </div>
                )}
              </Form.Group>

              {/* 2FA Toggle */}
              <div className="mb-4">
                <p className="twofa-label">For 2 layer security:</p>
                <div
                  className="twofa-box"
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <FaShieldAlt className="me-3 text-primary" />
                  <div className="flex-grow-1">
                    <span className="twofa-text">
                      Enable Two-Factor Authentication (2FA)
                    </span>
                  </div>
                  <Form.Check
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="ms-auto"
                  />
                </div>
              </div>

              {/* Register Button */}
              <Button
                onClick={handleRegister}
                className="register-btn"
                disabled={loading}
              >
                {loading ? "REGISTERING..." : "REGISTER"}
              </Button>
            </Form>

            {/* Login Link */}
            <div className="mt-3 text-center d-flex justify-content-center align-items-center gap-2">
              <span className="text-muted">Already have an account? </span>
              <Button
                variant="link"
                className="p-0 text-decoration-none login-link"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default SecurityRegister;
