import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";

function SecurityRegister() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    console.log("Registering with:", {
      password,
      confirmPassword,
      twoFactorEnabled,
    });
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
            width: "60%", // Custom width
            maxWidth: "800px", // Optional limit
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
              Set up Security
            </h3>
          </div>

          {/* Form Content */}
          <div
            className="px-4 d-flex flex-column align-items-center"
            style={{ width: "100%", maxWidth: "400px", margin: "40px auto 0" }}
          >
            {/* Smaller logo under it */}
            <div className="text-center" style={{ marginBottom: "60px" }}>
              <img
                src="/icons/DermaScan.png"
                alt="DERMAScan Text"
                style={{ width: "200px" }}
              />
            </div>
            <Form className="w-100">
              {/* Password Field */}
              <Form.Group className="mb-5 position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{
                    boxShadow: "none",
                    borderBottomColor: "#ddd",
                    padding: "12px 0",
                  }}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(false)}
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#666",
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(true)}
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#666",
                    }}
                  />
                )}
              </Form.Group>

              {/* Confirm Password Field */}
              <Form.Group className="mb-5 position-relative">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{
                    boxShadow: "none",
                    borderBottomColor: "#ddd",
                    padding: "12px 0",
                  }}
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowConfirmPassword(false)}
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#666",
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowConfirmPassword(true)}
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#666",
                    }}
                  />
                )}
              </Form.Group>

              {/* 2FA Toggle */}
              <div className="mb-4">
                <p
                  className="mb-2 text-muted"
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  For 2 layer security:
                </p>
                <div
                  className="d-flex align-items-center p-3 border rounded"
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderColor: "#dee2e6",
                    cursor: "pointer",
                  }}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <FaShieldAlt
                    className="me-3"
                    style={{ color: "#2962FF", fontSize: "20px" }}
                  />
                  <div className="flex-grow-1">
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
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
                style={{
                  width: "100%",
                  backgroundColor: "#2962FF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "15px 0",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: "16px",
                  marginTop: "30px",
                }}
              >
                REGISTER
              </Button>
            </Form>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <span className="text-muted">Already have an account? </span>
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={handleLogin}
                style={{
                  color: "#2962FF",
                  fontWeight: "500",
                }}
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
