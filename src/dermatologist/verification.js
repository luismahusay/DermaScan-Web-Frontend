import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RegistrationContext } from "../contexts/RegistrationContext";

function VerificationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clinicAddress: "",
    city: "",
    region: "",
    zipCode: "",
    clinicName: "",
    clinicAvailableDays: "",
    clinicTimeSchedule: "",
    timeFrom: "",
    timeTo: "",
    licenseImage: null,
    validIdType: "",
    validIdImage: null,
  });

  const { updateVerificationInfo } = useContext(RegistrationContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Validation functions
  const validateAddress = (address) => {
    if (!address.trim()) return "Clinic address is required";
    if (address.length < 10) return "Please provide a complete address";
    return null;
  };

  const validateCity = (city) => {
    if (!city.trim()) return "City is required";
    if (city.length < 2) return "City must be at least 2 characters";
    if (!/^[a-zA-Z\s.-]+$/.test(city))
      return "City can only contain letters, spaces, periods, and hyphens";
    return null;
  };

  const validateRegion = (region) => {
    if (!region.trim()) return "Region is required";
    if (region.length < 2) return "Region must be at least 2 characters";
    if (!/^[a-zA-Z\s.-]+$/.test(region))
      return "Region can only contain letters, spaces, periods, and hyphens";
    return null;
  };

  const validateZipCode = (zipCode) => {
    if (!zipCode.trim()) return "Zip code is required";
    if (!/^\d{4}$/.test(zipCode)) return "Zip code must be exactly 4 digits";
    return null;
  };

  const validateClinicName = (clinicName) => {
    if (!clinicName.trim()) return "Clinic name is required";
    if (clinicName.length < 3)
      return "Clinic name must be at least 3 characters";
    if (clinicName.length > 100)
      return "Clinic name must be less than 100 characters";
    return null;
  };

  const validateTimeSchedule = (timeSchedule) => {
    if (!timeSchedule.trim()) return "Time schedule is required";
    // Basic format validation for time schedule (e.g., "08:00 AM - 05:00 PM")
    const timePattern =
      /^\d{1,2}:\d{2}\s?(AM|PM)\s?-\s?\d{1,2}:\d{2}\s?(AM|PM)$/i;
    if (!timePattern.test(timeSchedule.trim())) {
      return "Please use format: 08:00 AM - 05:00 PM";
    }
    return null;
  };

  const validateFileUpload = (file, fieldName) => {
    if (!file) return `${fieldName} is required`;

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return `${fieldName} must be an image file (JPG, PNG, or GIF)`;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return `${fieldName} must be less than 5MB`;
    }

    return null;
  };

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    // Clear field error when user selects a file
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    // Validate file immediately
    if (file) {
      let fieldError = null;
      if (name === "licenseImage") {
        fieldError = validateFileUpload(file, "License image");
      } else if (name === "validIdImage") {
        fieldError = validateFileUpload(file, "Valid ID image");
      }

      if (fieldError) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: fieldError,
        }));
      }
    }

    // Clear general error when user starts correcting
    if (error) {
      setError("");
    }
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
      case "clinicAddress":
        fieldError = validateAddress(value);
        break;
      case "city":
        fieldError = validateCity(value);
        break;
      case "region":
        fieldError = validateRegion(value);
        break;
      case "zipCode":
        fieldError = validateZipCode(value);
        break;
      case "clinicName":
        fieldError = validateClinicName(value);
        break;
      case "clinicTimeSchedule":
        fieldError = validateTimeSchedule(value);
        break;
      case "clinicAvailableDays":
        if (!value) fieldError = "Please select available days";
        break;
      case "validIdType":
        if (!value) fieldError = "Please select a valid ID type";
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
    // Comprehensive validation
    const validationErrors = {};

    validationErrors.clinicAddress = validateAddress(formData.clinicAddress);
    validationErrors.city = validateCity(formData.city);
    validationErrors.region = validateRegion(formData.region);
    validationErrors.zipCode = validateZipCode(formData.zipCode);
    validationErrors.clinicName = validateClinicName(formData.clinicName);
    validationErrors.clinicTimeSchedule = validateTimeSchedule(
      formData.clinicTimeSchedule
    );

    if (!formData.clinicAvailableDays) {
      validationErrors.clinicAvailableDays = "Please select available days";
    }

    if (!formData.validIdType) {
      validationErrors.validIdType = "Please select a valid ID type";
    }

    // File validations
    validationErrors.licenseImage = validateFileUpload(
      formData.licenseImage,
      "License image"
    );
    validationErrors.validIdImage = validateFileUpload(
      formData.validIdImage,
      "Valid ID image"
    );

    // Remove null errors
    const activeErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([_, error]) => error !== null)
    );

    if (Object.keys(activeErrors).length > 0) {
      setFieldErrors(activeErrors);
      setError(""); // Clear general error when showing field-specific errors
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFieldErrors({}); // Clear field errors on successful validation

      // Store verification data in context
      updateVerificationInfo(formData);
      navigate("/dermatologist/security");
    } catch (error) {
      setError("Failed to proceed. Please try again.");
      setFieldErrors({}); // Clear field errors when showing server error
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate("/dermatologist/derma_login");
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center p-0"
      style={{
        backgroundImage: `url("/icons/background.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        className="bg-white shadow-lg p-0 d-flex flex-column"
        style={{
          borderRadius: "20px",
          maxWidth: "1200px",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          className="text-center text-white"
          style={{
            backgroundColor: "#205EFA",
            borderRadius: "0 0 20px 20px",
            minHeight: "130px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3 className="mb-0" style={{ fontWeight: "bold", fontSize: "40px" }}>
            Verification
          </h3>
        </div>
        {error && (
          <Alert variant="danger" className="mx-5 mt-3">
            {error}
          </Alert>
        )}
        <div
          className="p-md-5 overflow-auto flex-grow-1 d-flex flex-column"
          style={{ borderRadius: "0 0 20px 20px" }}
        >
          <div className="text-center mb-3">
            <img
              src="/icons/DermaScan.png"
              alt="DERMAScan Text"
              style={{ width: "150px" }}
            />
          </div>

          <Form className="flex-grow-1 d-flex flex-column">
            <div className="flex-grow-1">
              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Control
                    type="text"
                    placeholder="Clinic Address"
                    name="clinicAddress"
                    value={formData.clinicAddress}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`border-0 border-bottom rounded-0 ps-0 ${
                      fieldErrors.clinicAddress ? "border-danger" : ""
                    }`}
                    style={{
                      boxShadow: "none",
                      width: "80%",
                      marginBottom: "5px",
                      marginLeft: "50px",
                    }}
                  />
                  {fieldErrors.clinicAddress && (
                    <div
                      className="text-danger small mb-2"
                      style={{ marginLeft: "50px" }}
                    >
                      {fieldErrors.clinicAddress}
                    </div>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`border-0 border-bottom rounded-0 ps-0 ${
                      fieldErrors.city ? "border-danger" : ""
                    }`}
                    style={{
                      boxShadow: "none",
                      width: "80%",
                      marginBottom: "5px",
                      marginLeft: "50px",
                    }}
                  />
                  {fieldErrors.city && (
                    <div
                      className="text-danger small mb-2"
                      style={{ marginLeft: "50px" }}
                    >
                      {fieldErrors.city}
                    </div>
                  )}
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Control
                    type="text"
                    placeholder="Region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`border-0 border-bottom rounded-0 ps-0 ${
                      fieldErrors.region ? "border-danger" : ""
                    }`}
                    style={{
                      boxShadow: "none",
                      width: "80%",
                      marginBottom: "5px",
                      marginLeft: "50px",
                    }}
                  />
                  {fieldErrors.region && (
                    <div
                      className="text-danger small mb-2"
                      style={{ marginLeft: "50px" }}
                    >
                      {fieldErrors.region}
                    </div>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`border-0 border-bottom rounded-0 ps-0 ${
                      fieldErrors.zipCode ? "border-danger" : ""
                    }`}
                    style={{
                      boxShadow: "none",
                      width: "80%",
                      marginBottom: "5px",
                      marginLeft: "50px",
                    }}
                  />
                  {fieldErrors.zipCode && (
                    <div
                      className="text-danger small mb-2"
                      style={{ marginLeft: "50px" }}
                    >
                      {fieldErrors.zipCode}
                    </div>
                  )}
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Control
                    type="text"
                    placeholder="Clinic Name"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`border-0 border-bottom rounded-0 ps-0 ${
                      fieldErrors.clinicName ? "border-danger" : ""
                    }`}
                    style={{
                      boxShadow: "none",
                      width: "80%",
                      marginBottom: "5px",
                      marginLeft: "50px",
                    }}
                  />
                  {fieldErrors.clinicName && (
                    <div
                      className="text-danger small mb-2"
                      style={{ marginLeft: "50px" }}
                    >
                      {fieldErrors.clinicName}
                    </div>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Select
                    name="clinicAvailableDays"
                    value={formData.clinicAvailableDays}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`border-0 border-bottom rounded-0 ps-0 ${
                      fieldErrors.clinicAvailableDays ? "border-danger" : ""
                    }`}
                    style={{
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      color: formData.clinicAvailableDays ? "#000" : "#6c757d",
                      width: "80%",
                      marginBottom: "5px",
                      marginLeft: "50px",
                    }}
                  >
                    <option value="">Clinic Available Days Mon-Fri</option>
                    <option value="monday-friday">Monday - Friday</option>
                    <option value="monday-saturday">Monday - Saturday</option>
                    <option value="everyday">Everyday</option>
                    <option value="weekends">Weekends Only</option>
                  </Form.Select>
                  {fieldErrors.clinicAvailableDays && (
                    <div
                      className="text-danger small mb-2"
                      style={{ marginLeft: "50px" }}
                    >
                      {fieldErrors.clinicAvailableDays}
                    </div>
                  )}
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0 order-2 order-md-2">
                  <h5 className="fw-bold mb-3" style={{ marginLeft: "50px" }}>
                    License ID
                  </h5>
                  <div
                    className="d-flex align-items-center"
                    style={{ marginBottom: "5px", marginLeft: "50px" }}
                  >
                    <span className="me-3">Upload Image:</span>
                    <label
                      htmlFor="licenseImage"
                      className={`btn btn-sm ${
                        fieldErrors.licenseImage ? "btn-danger" : "btn-primary"
                      }`}
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
                  {fieldErrors.licenseImage && (
                    <div
                      className="text-danger small mb-2"
                      style={{ marginLeft: "50px" }}
                    >
                      {fieldErrors.licenseImage}
                    </div>
                  )}
                </Col>
                <Col md={6} className="order-1 order-md-1">
                  <Form.Label
                    className="fw-bold"
                    style={{ marginLeft: "50px" }}
                  >
                    Clinic Time Schedule
                  </Form.Label>
                  <div
                    className="position-relative"
                    style={{
                      marginBottom: "5px",
                      marginLeft: "50px",
                      width: "80%",
                    }}
                  >
                    <Form.Control
                      type="text"
                      name="clinicTimeSchedule"
                      value={formData.clinicTimeSchedule}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="e.g. 08:00 AM - 05:00 PM"
                      className={`border-0 border-bottom rounded-0 ps-0 ${
                        fieldErrors.clinicTimeSchedule ? "border-danger" : ""
                      }`}
                      style={{
                        boxShadow: "none",
                        paddingRight: "30px",
                      }}
                    />
                    <i
                      className="fa-regular fa-clock position-absolute"
                      style={{
                        right: "5px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#888",
                        pointerEvents: "none",
                      }}
                    ></i>
                  </div>
                  {fieldErrors.clinicTimeSchedule && (
                    <div
                      className="text-danger small mb-2"
                      style={{ marginLeft: "50px" }}
                    >
                      {fieldErrors.clinicTimeSchedule}
                    </div>
                  )}
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <h5 className="fw-bold mb-3" style={{ marginLeft: "50px" }}>
                    Valid ID
                  </h5>
                  <div
                    className="d-flex align-items-center flex-wrap"
                    style={{ marginLeft: "50px", marginBottom: "5px" }}
                  >
                    <Form.Select
                      name="validIdType"
                      value={formData.validIdType}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`border-0 border-bottom rounded-0 ps-0 me-3 ${
                        fieldErrors.validIdType ? "border-danger" : ""
                      }`}
                      style={{
                        boxShadow: "none",
                        width: "150px",
                        flexShrink: 0,
                      }}
                    >
                      <option value="">Select Valid ID</option>
                      <option value="drivers-license">Driver's License</option>
                      <option value="passport">Passport</option>
                      <option value="national-id">National ID</option>
                      <option value="sss-id">SSS ID</option>
                      <option value="philhealth">PhilHealth ID</option>
                      <option value="voters-id">Voter's ID</option>
                    </Form.Select>
                    <span
                      className="me-2"
                      style={{ whiteSpace: "nowrap", fontSize: "14px" }}
                    >
                      Upload Image:
                    </span>
                    <label
                      htmlFor="validIdImage"
                      className={`btn btn-sm ${
                        fieldErrors.validIdImage ? "btn-danger" : "btn-primary"
                      }`}
                      style={{ whiteSpace: "nowrap" }}
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
                  </div>

                  {/* Show validation errors */}
                  {(fieldErrors.validIdType || fieldErrors.validIdImage) && (
                    <div
                      style={{
                        marginLeft: "50px",
                        marginBottom: "10px",
                      }}
                    >
                      {fieldErrors.validIdType && (
                        <div className="text-danger small">
                          {fieldErrors.validIdType}
                        </div>
                      )}
                      {fieldErrors.validIdImage && (
                        <div className="text-danger small">
                          {fieldErrors.validIdImage}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Show filename if uploaded */}
                  {formData.validIdImage && (
                    <div
                      style={{
                        marginLeft: "50px",
                        marginTop: "-5px",
                        marginBottom: "10px",
                      }}
                    >
                      <span className="text-muted" style={{ fontSize: "14px" }}>
                        {formData.validIdImage.name}
                      </span>
                    </div>
                  )}
                </Col>
              </Row>
            </div>

            <div className="text-center mt-auto">
              <Button
                onClick={handleNext}
                className="fw-bold text-uppercase"
                disabled={loading}
                style={{
                  backgroundColor: "#205EFA",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(41, 98, 255, 0.3)",
                  width: "350px",
                  height: "60px",
                  fontSize: "16px",
                }}
              >
                {loading ? "Processing..." : "Next"}
              </Button>
            </div>
          </Form>

          <div className="mt-4 text-center d-flex justify-content-center align-items-center gap-2">
            <span style={{ color: "#666", fontSize: "14px" }}>
              Already have an account?{" "}
            </span>
            <Button
              variant="link"
              className="p-0 text-decoration-none text-primary fw-medium"
              onClick={handleSignIn}
              style={{ fontSize: "14px" }}
            >
              Login
            </Button>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default VerificationForm;
