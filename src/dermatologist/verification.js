import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
    navigate("/dermatologist/security");
  };

  const handleSignIn = () => {
    navigate("/dermatologist/derma_login");
  };

  return (
    <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center p-0" style={{ backgroundImage: `url("/icons/background.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <Container className="bg-white shadow-lg p-0" style={{ borderRadius: "20px", maxWidth: "1200px", width: "100%", minHeight: "60vh" }}>

        <div className="text-center text-white" style={{ backgroundColor: "#2962FF", borderRadius: "20px", minHeight: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h3 className="mb-0" style={{ fontWeight: "bold", fontSize: "40px" }}>Verification</h3>
        </div>

        <div className=" p-md-5 overflow-auto" style={{ maxHeight: "calc(100vh - 160px)" }}>
          <div className="text-center mb-3">
            <img src="/icons/DermaScan.png" alt="DERMAScan Text" style={{ width: "150px" }} />
          </div>

          <Form>
            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Control type="text" placeholder="Clinic Address" name="clinicAddress" value={formData.clinicAddress} onChange={handleInputChange} className="border-0 border-bottom rounded-0 ps-0" style={{ boxShadow: "none" }} />
              </Col>
              <Col md={6}>
                <Form.Control type="text" placeholder="City" name="city" value={formData.city} onChange={handleInputChange} className="border-0 border-bottom rounded-0 ps-0" style={{ boxShadow: "none" }} />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Control type="text" placeholder="Region" name="region" value={formData.region} onChange={handleInputChange} className="border-0 border-bottom rounded-0 ps-0" style={{ boxShadow: "none" }} />
              </Col>
              <Col md={6}>
                <Form.Control type="text" placeholder="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="border-0 border-bottom rounded-0 ps-0" style={{ boxShadow: "none" }} />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Control type="text" placeholder="Clinic Name" name="clinicName" value={formData.clinicName} onChange={handleInputChange} className="border-0 border-bottom rounded-0 ps-0" style={{ boxShadow: "none" }} />
              </Col>
              <Col md={6}>
                <Form.Select name="clinicAvailableDays" value={formData.clinicAvailableDays} onChange={handleInputChange} className="border-0 border-bottom rounded-0 ps-0" style={{ boxShadow: "none", backgroundColor: "transparent", color: formData.clinicAvailableDays ? "#000" : "#6c757d" }}>
                  <option value="">Clinic Available Days Mon-Fri</option>
                  <option value="monday-friday">Monday - Friday</option>
                  <option value="monday-saturday">Monday - Saturday</option>
                  <option value="everyday">Everyday</option>
                  <option value="weekends">Weekends Only</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <h5 className="fw-bold mb-3">License ID</h5>
                <div className="d-flex align-items-center">
                  <span className="me-3">Upload Image:</span>
                  <label htmlFor="licenseImage" className="btn btn-primary btn-sm">+ Choose File</label>
                  <input type="file" id="licenseImage" name="licenseImage" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                  {formData.licenseImage && <span className="ms-3 text-muted">{formData.licenseImage.name}</span>}
                </div>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">Clinic Time Schedule</Form.Label>
                <div className="position-relative">
                  <Form.Control type="text" name="clinicTimeSchedule" value={formData.clinicTimeSchedule} onChange={handleInputChange} placeholder="e.g. 08:00 AM - 05:00 PM" className="border-0 border-bottom rounded-0 ps-0" style={{ boxShadow: "none" }} />
                  <i className="fa-regular fa-clock position-absolute" style={{ right: "10px", top: "50%", transform: "translateY(-50%)", color: "#888", pointerEvents: "none" }}></i>
                </div>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <h5 className="fw-bold mb-3">Valid ID</h5>
                <Form.Select name="validIdType" value={formData.validIdType} onChange={handleInputChange} className="border-0 border-bottom rounded-0 ps-0" style={{ boxShadow: "none" }}>
                  <option value="">Select Valid ID</option>
                  <option value="drivers-license">Driver's License</option>
                  <option value="passport">Passport</option>
                  <option value="national-id">National ID</option>
                  <option value="sss-id">SSS ID</option>
                  <option value="philhealth">PhilHealth ID</option>
                  <option value="voters-id">Voter's ID</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="d-flex align-items-center mt-md-4 pt-md-2">
                  <span className="me-3">Upload Image:</span>
                  <label htmlFor="validIdImage" className="btn btn-primary btn-sm">+ Choose File</label>
                  <input type="file" id="validIdImage" name="validIdImage" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                  {formData.validIdImage && <span className="ms-3 text-muted">{formData.validIdImage.name}</span>}
                </div>
              </Col>
            </Row>

            <div className="text-center">
              <Button onClick={handleNext} className="px-5 py-2 fw-bold text-uppercase" style={{ backgroundColor: "#2962FF", border: "none", borderRadius: "8px", boxShadow: "0 4px 8px rgba(41, 98, 255, 0.3)" }}>
                Next
              </Button>
            </div>
          </Form>

          <div className="mt-4 text-center d-flex justify-content-center align-items-center gap-2">
            <span style={{ color: "#666", fontSize: "14px" }}>
              Already have an account?{' '}
            </span>
            <Button variant="link" className="p-0 text-decoration-none text-primary fw-medium" onClick={handleSignIn} style={{ fontSize: "14px" }}>
              Login
            </Button>
          </div>
        </div>
      </Container>
    </Container>
  );
}
export default VerificationForm;