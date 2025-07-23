import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/derma_register.css";

function PersonalInformationForm() {
  const navigate = useNavigate();


  const handleNext = () => {
    navigate('/dermatologist/verification');
  };
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

  const handleSignIn = () => {
    navigate('/dermatologist/derma_login');
  };


  return (
    <Container
      fluid
      className="register-bg d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/icons/background.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div className="responsive-register-form-container ">
        <div className="register-header text-center text-white">
          <h3 className="mb-0">Personal Information</h3>
        </div>

        <div className="register-form-content">
          <div className="text-center">
            <img src="/icons/DermaScan.png" alt="DERMAScan" className="register-logo" />
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
                  className="form-input"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
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
                  className="form-input"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Suffix (Optional)"
                  name="suffix"
                  value={formData.suffix}
                  onChange={handleInputChange}
                  className="form-input"
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
                  className="form-input"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-input"
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
                  className="form-input"
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`form-input ${!formData.gender && 'placeholder-text'}`}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Form.Select>
              </Col>
            </Row>

            <div className="text-center fw-semibold">
              <Button onClick={handleNext} className="next-button">
                NEXT
              </Button>
            </div>
          </Form>

          <div className="mt-2 text-center d-flex justify-content-center align-items-center">
            <span className="signin-label">
              Already have an account?{" "}
            </span>
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
    </Container>
  );
}
export default PersonalInformationForm;