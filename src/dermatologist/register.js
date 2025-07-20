import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PersonalInformationForm() {
  const navigate = useNavigate();

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

  const handleNext = () => {
    // TODO: Add form validation and next step logic
    console.log("Form data:", formData);
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center p-0"
      style={{
        backgroundImage: `url("/icons/background.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Centered white form container */}
      <div
        className="bg-white shadow-lg"
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "100vh",
          minHeight: "650px",
          borderRadius: "0px",
          overflow: "hidden",
          margin: "20px",
        }}
      >
        {/* Blue header */}
        <div
          className="text-center text-white"
          style={{
            backgroundColor: "#2962FF",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            minHeight: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3 className="mb-0" style={{ fontWeight: "bold", fontSize: "50px" }}>
            Personal Information
          </h3>
        </div>

        {/* Form content */}
        <div
          className="p-5 h-70 d-flex flex-column justify-content-center"
          style={{ marginTop: "-30px" }}
        >
          {/* Logo Section */}
          <div className="text-center" style={{ marginBottom: "100px" }}>
            <img
              src="/icons/DermaScan.png"
              alt="DERMAScan Text"
              style={{ width: "200px" }}
            />
          </div>

          <Form>
            {/* First row - First Name and Last Name */}
            <Row className="mb-5 justify-content-center">
              <Col md={4} className="me-5">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
            </Row>

            {/* Second row - Middle Name and Suffix */}
            <Row className="mb-5 justify-content-center">
              <Col md={4} className="me-5">
                <Form.Control
                  type="text"
                  placeholder="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Suffix (Optional)"
                  name="suffix"
                  value={formData.suffix}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
            </Row>

            {/* Third row - Email and Phone */}
            <Row className="mb-5 justify-content-center">
              <Col md={4} className="me-5">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
            </Row>

            {/* Fourth row - Address and Gender */}
            <Row className="mb-5 justify-content-center">
              <Col md={4} className="me-5">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    color: formData.gender ? "#000" : "#6c757d",
                  }}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Next Button */}
            <div className="text-center">
              <Button
                onClick={handleNext}
                style={{
                  width: "60%",
                  maxWidth: "300px",
                  backgroundColor: "#2962FF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "16px 0",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: "16px",
                  marginTop: "20px",
                  boxShadow: "0 4px 8px rgba(41, 98, 255, 0.3)",
                }}
              >
                NEXT
              </Button>
            </div>
          </Form>

          {/* Sign in link */}
          <div className="mt-4 text-center">
            <span style={{ color: "#666", fontSize: "14px" }}>
              Already have an account?{" "}
            </span>
            <Button
              variant="link"
              className="p-0 text-decoration-none text-primary"
              onClick={handleSignIn}
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default PersonalInformationForm;
