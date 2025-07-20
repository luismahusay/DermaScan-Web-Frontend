import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>;
function VerificationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clinicAddress: "",
    city: "",
    region: "",
    zipCode: "",
    clinicName: "",
    clinicAvailableDays: "",
    timeFrom: "",
    timeTo: "",
    licenseImage: null,
    validIdType: "",
    validIdImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
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
            Verification
          </h3>
        </div>

        {/* Form content */}
        <div
          className="p-5 h-70 d-flex flex-column justify-content-center"
          style={{ marginTop: "-30px", overflowY: "auto" }}
        >
          {/* Logo Section */}
          <div className="text-center" style={{ marginBottom: "80px" }}>
            <img
              src="/icons/DermaScan.png"
              alt="DERMAScan Text"
              style={{ width: "200px" }}
            />
          </div>

          <Form>
            {/* First row - Clinic Address and City */}
            <Row className="mb-5 justify-content-center">
              <Col md={4} className="me-5">
                <Form.Control
                  type="text"
                  placeholder="Clinic Address"
                  name="clinicAddress"
                  value={formData.clinicAddress}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
            </Row>

            {/* Second row - Region and Zip Code */}
            <Row className="mb-5 justify-content-center">
              <Col md={4} className="me-5">
                <Form.Control
                  type="text"
                  placeholder="Region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
            </Row>

            {/* Third row - Clinic Name and Available Days */}
            <Row className="mb-5 justify-content-center">
              <Col md={4} className="me-5">
                <Form.Control
                  type="text"
                  placeholder="Clinic Name"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ boxShadow: "none" }}
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  name="clinicAvailableDays"
                  value={formData.clinicAvailableDays}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    color: formData.clinicAvailableDays ? "#000" : "#6c757d",
                  }}
                >
                  <option value="">Clinic Available Days Mon-Fri</option>
                  <option value="monday-friday">Monday - Friday</option>
                  <option value="monday-saturday">Monday - Saturday</option>
                  <option value="everyday">Everyday</option>
                  <option value="weekends">Weekends Only</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Fourth row - License ID and Time Schedule */}
            <Row className="mb-5 justify-content-center">
              {/* License ID - Left side */}
              <Col md={4} className="me-5">
                <h5 style={{ fontSize:"25px",fontWeight: "bold", marginBottom: "20px" }}>
                  License ID
                </h5>
                <div className="d-flex align-items-center">
                  <span className="me-3">Upload Image:</span>
                  <label
                    htmlFor="licenseImage"
                    className="btn btn-primary btn-sm"
                  >
                    + Choose File
                  </label>
                  <input
                    type="file"
                    id="licenseImage"
                    name="licenseImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  {formData.licenseImage && (
                    <span className="ms-3 text-muted">
                      {formData.licenseImage.name}
                    </span>
                  )}
                </div>
              </Col>

              {/* Time Schedule - Right side */}
              <Col md={4}>
                <div className="d-flex flex-column">
                  <label
                    htmlFor="clinicTimeSchedule"
                    style={{ fontWeight: "bold", marginBottom: "10px" }}
                  >
                    Clinic Time Schedule
                  </label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      id="clinicTimeSchedule"
                      name="clinicTimeSchedule"
                      value={formData.clinicTimeSchedule}
                      onChange={handleInputChange}
                      placeholder="e.g. 08:00 AM - 05:00 PM"
                      className="border-0 border-bottom rounded-0 ps-0 pe-5"
                      style={{ boxShadow: "none" }}
                    />
                    <i
                      className="fa-regular fa-clock position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#888",
                        pointerEvents: "none",
                      }}
                    ></i>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Valid ID Section */}
            <Row className="mb-5 justify-content-center">
              {/* Dropdown Field */}
              <Col md={4} className="me-5">
                <h5 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "20px" }}>
                  Valid ID:
                </h5>
                <Form.Select
                  name="validIdType"
                  value={formData.validIdType}
                  onChange={handleInputChange}
                  className="border-0 border-bottom rounded-0 ps-0 pe-5"
                  style={{ width: "100%", boxShadow: "none" }}
                >
                  <option value="">Dropdown field data</option>
                  <option value="drivers-license">Driver's License</option>
                  <option value="passport">Passport</option>
                  <option value="national-id">National ID</option>
                  <option value="sss-id">SSS ID</option>
                  <option value="philhealth">PhilHealth ID</option>
                  <option value="voters-id">Voter's ID</option>
                </Form.Select>
              </Col>

              {/* Upload Field */}
              <Col md={4}>
                <h5
                  style={{
                    fontWeight: "bold",
                    marginBottom: "20px",
                    visibility: "hidden",
                  }}
                >
                  Label spacing
                </h5>
                <div className="d-flex align-items-center">
                  <span className="me-3">Upload Image:</span>
                  <label
                    htmlFor="validIdImage"
                    className="btn btn-primary btn-sm"
                  >
                    + Choose File
                  </label>
                  <input
                    type="file"
                    id="validIdImage"
                    name="validIdImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  {formData.validIdImage && (
                    <span className="ms-3 text-muted">
                      {formData.validIdImage.name}
                    </span>
                  )}
                </div>
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
                  marginTop: "10px",
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

export default VerificationForm;
