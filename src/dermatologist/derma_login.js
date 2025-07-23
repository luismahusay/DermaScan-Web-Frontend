import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { Container, Row, Col, Form, InputGroup, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DermaLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left image side */}
        <Col
          md={6}
          className="d-none d-md-block p-0"
          style={{
            backgroundImage: `url("/icons/background.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Right side - Responsive */}
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center bg-white"
        >
            <div className="w-100" style={{ maxWidth: '400px', padding: '10px' }}>
            {/* Logo image */}
            <div className="text-center mb-5">
              <img
                src="/icons/logo.png" 
                alt="DermaScan Logo"
                style={{ width: '15rem', height: '13rem' }}
              />
            </div>

            {/* Email field with icon */}
            <Form onSubmit={e => { e.preventDefault(); navigate('/dermatologist/dashboard'); }}>
              <Form.Group controlId="formEmail" className="mb-4">
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="rounded-0 border-bottom border-2 mb-3 pt-2 pb-2 ps-3 pe-3 border-top-0 border-start-0 border-end-0"
                  />
                  <InputGroup.Text className="bg-white border-0 border-bottom border-2 mb-3">
                    <img
                      src="/icons/person.svg"
                      alt="User Icon"
                      className="w-100 h-auto"
                      width="32" height="32"
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
                  />
                  <InputGroup.Text className="bg-white border-0 border-bottom border-2 mb-3">
                    <span
                      className="text-secondary"
                      style={{ cursor: 'pointer', fontSize: '2rem' }}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
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
                  style={{ fontSize: '0.95rem' }}
                  onClick={e => { e.preventDefault(); navigate('/dermatologist/forgotpassword'); }}
                >
                  Forgot password?
                </Button>
              </div>

              {/* Login Button */}
              <div className="d-grid">
                <Button
                  type="submit"
                  className="rounded-1 bg-primary border-0 py-2 px-0 fs-5 fw-bold text-white"
                >
                  LOGIN
                </Button>
              </div>
            </Form>
            {/* Sign up link */}
            <div className="mt-4 text-center d-flex align-items-center justify-content-center gap-2">
              <span style={{ color: '#666', fontSize: '0.98rem' }}>
                Don’t have an account?{' '}
              </span>
              <Button
                variant="link"
                className="p-0 text-decoration-none text-primary"
                style={{ fontSize: '0.98rem', fontWeight: 500 }}
                onClick={e => { e.preventDefault(); navigate('/dermatologist/register'); }}
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