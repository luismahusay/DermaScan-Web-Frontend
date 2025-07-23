import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/derma_security.css";

function SecurityRegister() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    navigate("/dermatologist/emailverification");
  };

  const handleLogin = () => {
    navigate("/dermatologist/derma_login");
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pe-5"
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
              </Form.Group>

              {/* Confirm Password Field */}
              <Form.Group className="mb-4 position-relative">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pe-5"
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
              <Button onClick={handleRegister} className="register-btn">
                REGISTER
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
