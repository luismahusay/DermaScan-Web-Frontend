import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  // ✅ Email input state
  const [email, setEmail] = useState("");

  // ✅ Reset password handler
  const handleResetPassword = () => {
    console.log("Reset password for:", email);
    // TODO: Add actual password reset logic or API call here
  };

  // ✅ Go back to login
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
              Forgot Password
            </h3>
          </div>

          {/* Form Content */}
          <div
            className="px-4 d-flex flex-column align-items-center"
            style={{ width: "100%", maxWidth: "400px", margin: "40px auto 0" }}
          >
            {/* BIG LOGO */}
            <div className="text-center" style={{ marginBottom: "30px" }}>
              <img
                src="/icons/biggerlogodermascan.png"
                alt="DERMAScan Full Logo"
                style={{ width: "200px" }}
              />
            </div>

            {/* Small Text Logo */}
            <div className="text-center" style={{ marginBottom: "50px" }}>
              <img
                src="/icons/DermaScan.png"
                alt="DERMAScan"
                style={{ width: "200px" }}
              />
            </div>

            <p
              className="text-center text-muted mb-4"
              style={{ fontWeight: "bold", marginLeft: "-10px", textAlign: "left" }}
            >
              Please enter your email to reset the password
            </p>

            {/* Email Input */}
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 border-bottom rounded-0 ps-0 pe-5 mb-4"
              style={{ boxShadow: "none" }}
            />

            {/* Reset Password Button */}
            <Button
              onClick={handleResetPassword}
              style={{
                width: "90%",
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

            {/* Back to Login */}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
