import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { RegistrationContext } from "../contexts/RegistrationContext";
import { auth } from "../config/firebase";
import "../styles/derma_register.css";

function PersonalInformationForm() {
  const navigate = useNavigate();
  const { updatePersonalInfo } = useContext(RegistrationContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to check if email already exists using Firebase
  const checkEmailAvailability = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length === 0; // true if email is available (no sign-in methods found)
    } catch (error) {
      console.error("Error checking email availability:", error);
      throw new Error("Failed to verify email availability. Please try again.");
    }
  };

  const handleNext = async () => {
    // Validation
    const requiredFields = [
      "firstName",
      "lastName",
      "emailAddress",
      "phoneNumber",
      "address",
      "gender",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (emptyFields.length > 0) {
      setError("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailAddress)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Check if email is already in use
      const isEmailAvailable = await checkEmailAvailability(
        formData.emailAddress
      );

      if (!isEmailAvailable) {
        setError(
          "This email address is already registered. Please use a different email or try logging in instead."
        );
        return;
      }

      // Store data in context
      updatePersonalInfo(formData);
      navigate("/dermatologist/verification");
    } catch (error) {
      setError(error.message || "Failed to proceed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate("/dermatologist/derma_login");
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col
          xs={12}
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/icons/background.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="responsive-register-form-container ">
            <div className="register-header text-center text-white">
              <h3 className="mb-0">Personal Information</h3>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="register-form-content">
              <div className="text-center">
                <img
                  src="/icons/DermaScan.png"
                  alt="DERMAScan"
                  className="register-logo"
                />
              </div>

              <Form>
                <Row className="mb-4 justify-content-center">
                  <Col md={4} className="me-md-5 mb-3 mb-md-0">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                    />
                  </Col>
                </Row>

                <Row className="mb-4 justify-content-center">
                  <Col md={4} className="me-md-5 mb-3 mb-md-0">
                    <Form.Control
                      type="text"
                      placeholder="Middle Name"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Suffix (Optional)"
                      name="suffix"
                      value={formData.suffix}
                      onChange={handleInputChange}
                      className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                    />
                  </Col>
                </Row>

                <Row className="mb-4 justify-content-center">
                  <Col md={4} className="me-md-5 mb-3 mb-md-0">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="tel"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                    />
                  </Col>
                </Row>

                <Row className="mb-5 justify-content-center">
                  <Col md={4} className="me-md-5 mb-3 mb-md-0">
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0 ${
                        !formData.gender && "placeholder-text"
                      }`}
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </Form.Select>
                  </Col>
                </Row>

                <div className="text-center fw-semibold">
                  <Button
                    onClick={handleNext}
                    className="next-button"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "NEXT"}
                  </Button>
                </div>
              </Form>

              <div className="mt-2 text-center d-flex justify-content-center align-items-center">
                <span className="signin-label">Already have an account? </span>
                <Button
                  variant="link"
                  className="login-button"
                  onClick={handleSignIn}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PersonalInformationForm;
