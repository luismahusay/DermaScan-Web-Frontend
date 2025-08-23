import React, { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
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

    setError("");
    setLoading(true);

    try {
      // Sign in with Firebase Auth
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Check if user is admin in Firestore
      const userDoc = await getDoc(doc(db, "Users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Verify admin role (removed isActive check)
        if (userData.User_Role === "admin") {
          navigate("/admin/admin_dashboard");
        } else {
          setError("Access denied. Admin privileges required.");
          // Sign out non-admin user
          await auth.signOut();
        }
      } else {
        setError("Admin profile not found.");
        await auth.signOut();
      }
    } catch (err) {
      console.error("Admin login error:", err);
      if (err.code === "auth/user-not-found") {
        setError("Admin account not found.");
      } else if (err.code === "auth/wrong-password") {
        setError("Invalid password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please check your credentials.");
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

            {/* Error Alert */}
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            {/* Temporary Credentials Info (remove in production) */}
            <Alert variant="info" className="mb-3 small">
              <strong>Temporary Admin Login:</strong>
              <br />
              Email: admin@dermascan.com
              <br />
              Password: Admin123!
            </Alert>

            {/* Login Form */}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-4">
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
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

              <Form.Group controlId="formPassword" className="mb-4">
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
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

              {/* Login Button */}
              <div className="d-grid">
                <Button
                  type="submit"
                  className="rounded-1 bg-primary border-0 py-2 px-0 fs-5 fw-bold text-white"
                  disabled={loading}
                >
                  {loading ? "LOGGING IN..." : "LOGIN"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLogin;
