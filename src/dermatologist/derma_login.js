import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'; // ✅ Add this line

function DermaLogin() {
  const navigate = useNavigate(); // ✅ You forgot this before

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    // TODO: Add login logic
    console.log('Logging in with:', email, password);
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left image side */}
        <Col
          md={6}
          className="d-none d-md-block p-0"
          style={{
            backgroundImage: `url("/icons/background.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right side - Login form */}
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center bg-white"
        >
          <div
            className="text-center px-4"
            style={{ width: "100%", maxWidth: "400px", marginTop: "-200px" }}
          >
            {/* Logo Section */}
            <div
              className="d-flex flex-column align-items-center"
              style={{ marginBottom: "100px" }}
            >
              <img
                src="/icons/biggerlogodermascan.png"
                alt="Logo"
                style={{ width: "300px", marginBottom: "10px" }}
              />
              <img
                src="/icons/DermaScan.png"
                alt="DERMAScan Text"
                style={{ width: "180px" }}
              />
            </div>

            <Form className="text-start">
              {/* Email Field */}
              <div className="mb-5 position-relative">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
                <FaUser
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    color: "#666",
                  }}
                />
              </div>

              {/* Password Field */}
              <div className="mb-2 position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="position-absolute"
                    onClick={toggleShowPassword}
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
                    className="position-absolute"
                    onClick={toggleShowPassword}
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#666",
                    }}
                  />
                )}
              </div>

              <div className="text-end mb-3">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none text-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "forgotpassword"; // Change to your actual file names
                  }}
                >
                  Forgot Password?
                </Button>
              </div>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                  window.location.href = "dashboard";
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#2962FF",
                  border: "none",
                  borderRadius: "4px",
                  padding: "18px 0",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: "15px",
                  marginTop: "40px", // ← this creates the space you want
                }}
              >
                LOGIN
              </Button>
            </Form>

            <div className="mt-3">
              Don’t have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-decoration-none text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "register";
                }}
              >
                Sign up
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DermaLogin;
