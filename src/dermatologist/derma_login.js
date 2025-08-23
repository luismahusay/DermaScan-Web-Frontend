import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { Container, Row, Col, Form, InputGroup, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from 'react-bootstrap';

function DermaLogin() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Add this
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dermatologist/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/too-many-requests") {
        setError("Too many login attempts. Please try again later.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Failed to log in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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

        {/* Right side - Responsive */}
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center bg-white"
        >
          <div className="w-100" style={{ maxWidth: "400px", padding: "10px" }}>
            {/* Logo image */}
            <div className="text-center mb-5">
              <img
                src="/icons/logo.png"
                alt="DermaScan Logo"
                style={{ width: "15rem", height: "13rem" }}
              />
            </div>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}
            {/* Email field with icon */}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-4">
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <InputGroup.Text className="bg-white border-0 border-bottom border-2 mb-3">
                    <img
                      src="/icons/person.svg"
                      alt="User Icon"
                      className="w-100 h-auto"
                      width="32"
                      height="32"
                    />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Password field with icon */}
              <Form.Group controlId="formPassword">
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <InputGroup.Text className="bg-white border-0 border-bottom border-2 mb-3">
                    <span
                      className="text-secondary"
                      style={{ cursor: "pointer", fontSize: "2rem" }}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEyeFill />}
                    </span>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Forgot password link */}
              <div className="text-end mb-5">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none text-primary"
                  style={{ fontSize: "0.95rem" }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/dermatologist/forgotpassword");
                  }}
                >
                  Forgot password?
                </Button>
              </div>

              {/* Login Button */}
              <div className="d-grid">
                <Button
                  type="submit"
                  className="rounded-1 bg-primary border-0 py-2 px-0 fs-5 fw-bold text-white"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "LOGIN"}
                </Button>
              </div>
            </Form>
            {/* Sign up link */}
            <div className="mt-4 text-center d-flex align-items-center justify-content-center gap-2">
              <span style={{ color: "#666", fontSize: "0.98rem" }}>
                Don’t have an account?{" "}
              </span>
              <Button
                variant="link"
                className="p-0 text-decoration-none text-primary"
                style={{ fontSize: "0.98rem", fontWeight: 500 }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/dermatologist/register");
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