import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { RegistrationContext } from "../contexts/RegistrationContext";
import { auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import "../styles/derma_register.css";

function PersonalInformationForm() {
  const navigate = useNavigate();
  const { updatePersonalInfo } = useContext(RegistrationContext);
  const { checkEmailAvailability } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
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

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    // Clear general error when user starts correcting
    if (error) {
      setError("");
    }
  };
  // Function to check if email already exists using Firebase
  const validateName = (name, fieldName) => {
    if (!name.trim()) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    if (!/^[a-zA-Z\s'-]+$/.test(name))
      return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
    return null;
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
  };

  const validatePhoneNumber = (phone) => {
    if (!phone.trim()) return "Phone number is required";
    const phoneRegex = /^(\+63|0)[0-9]{10}$/; // Philippine format
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return "Please enter a valid Philippine phone number (e.g., +639123456789 or 09123456789)";
    }
    return null;
  };

  const validateAddress = (address) => {
    if (!address.trim()) return "Address is required";
    if (address.length < 10) return "Please provide a complete address";
    return null;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur and show error immediately
    let fieldError = null;
    switch (name) {
      case "firstName":
        fieldError = validateName(value, "First name");
        break;
      case "lastName":
        fieldError = validateName(value, "Last name");
        break;
      case "emailAddress":
        fieldError = validateEmail(value);
        break;
      case "phoneNumber":
        fieldError = validatePhoneNumber(value);
        break;
      case "address":
        fieldError = validateAddress(value);
        break;
      case "gender":
        if (!value) fieldError = "Please select your gender";
        break;
      default:
        break;
    }

    if (fieldError) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    } else {
      // Clear the error if field is now valid
      setFieldErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };
 const handleNext = async () => {
   // First do basic validation
   const validationErrors = {};

   validationErrors.firstName = validateName(formData.firstName, "First name");
   validationErrors.lastName = validateName(formData.lastName, "Last name");

   // Only validate middle name if it's provided (since it's optional)
   if (formData.middleName.trim()) {
     validationErrors.middleName = validateName(
       formData.middleName,
       "Middle name"
     );
   }

   validationErrors.emailAddress = validateEmail(formData.emailAddress);
   validationErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
   validationErrors.address = validateAddress(formData.address);

   if (!formData.gender) {
     validationErrors.gender = "Please select your gender";
   }

   // Remove null errors
   const activeErrors = Object.fromEntries(
     Object.entries(validationErrors).filter(([_, error]) => error !== null)
   );

   if (Object.keys(activeErrors).length > 0) {
     setFieldErrors(activeErrors);
     // Create a specific error summary
     const errorCount = Object.keys(activeErrors).length;
     const errorMessages = Object.values(activeErrors);
     setError(
       `Please fix ${errorCount} error${
         errorCount > 1 ? "s" : ""
       }: ${errorMessages.join(", ")}`
     );
     return;
   }

   // Now check email availability using AuthContext function
   try {
     setLoading(true);
     setError("");

     console.log("Checking email availability for:", formData.emailAddress); // Debug log

     // Use the function from AuthContext which is more reliable
     const isEmailAvailable = await checkEmailAvailability(
       formData.emailAddress
     );

     console.log("Email available:", isEmailAvailable); // Debug log

     if (!isEmailAvailable) {
       console.log("Email is not available - stopping here"); // Debug log
       setFieldErrors((prev) => ({
         ...prev,
         emailAddress: "This email address is already registered",
       }));
       setError(
         "This email address is already registered. Please use a different email or try logging in instead."
       );
       return;
     }

     console.log("Email is available - proceeding"); // Debug log

     // If email is available, proceed
     updatePersonalInfo(formData);
     navigate("/dermatologist/verification");
   } catch (error) {
     console.error("Email check error:", error);
     setError(error.message);
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
                      onBlur={handleBlur}
                      className={`rounded-0 border-bottom border-2 mb-1 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0 ${
                        fieldErrors.firstName ? "border-danger" : ""
                      }`}
                      isInvalid={fieldErrors.firstName}
                    />
                    {fieldErrors.firstName && (
                      <div
                        className="text-danger small mb-2"
                        style={{ marginLeft: "3px" }}
                      >
                        {fieldErrors.firstName}
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`rounded-0 border-bottom border-2 mb-1 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0 ${
                        fieldErrors.lastName ? "border-danger" : ""
                      }`}
                      isInvalid={fieldErrors.lastName}
                    />
                    {fieldErrors.lastName && (
                      <div
                        className="text-danger small mb-2"
                        style={{ marginLeft: "3px" }}
                      >
                        {fieldErrors.lastName}
                      </div>
                    )}
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
                      onBlur={handleBlur}
                      className={`rounded-0 border-bottom border-2 mb-1 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0 ${
                        fieldErrors.emailAddress ? "border-danger" : ""
                      }`}
                      isInvalid={fieldErrors.emailAddress}
                    />
                    {fieldErrors.emailAddress && (
                      <div
                        className="text-danger small mb-2"
                        style={{ marginLeft: "3px" }}
                      >
                        {fieldErrors.emailAddress}
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="tel"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`rounded-0 border-bottom border-2 mb-1 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0 ${
                        fieldErrors.phoneNumber ? "border-danger" : ""
                      }`}
                      isInvalid={fieldErrors.phoneNumber}
                    />
                    {fieldErrors.phoneNumber && (
                      <div
                        className="text-danger small mb-2"
                        style={{ marginLeft: "3px" }}
                      >
                        {fieldErrors.phoneNumber}
                      </div>
                    )}
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
                      onBlur={handleBlur}
                      className={`rounded-0 border-bottom border-2 mb-1 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0 ${
                        fieldErrors.address ? "border-danger" : ""
                      }`}
                      isInvalid={fieldErrors.address}
                    />
                    {fieldErrors.address && (
                      <div
                        className="text-danger small mb-2"
                        style={{ marginLeft: "3px" }}
                      >
                        {fieldErrors.address}
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`rounded-0 border-bottom border-2 mb-1 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0 ${
                        !formData.gender && "placeholder-text"
                      } ${fieldErrors.gender ? "border-danger" : ""}`}
                      isInvalid={fieldErrors.gender}
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </Form.Select>
                    {fieldErrors.gender && (
                      <div
                        className="text-danger small mb-2"
                        style={{ marginLeft: "3px" }}
                      >
                        {fieldErrors.gender}
                      </div>
                    )}
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
