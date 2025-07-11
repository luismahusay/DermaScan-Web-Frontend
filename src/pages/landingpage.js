import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

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
          <Card
            className="p-4 rounded-4 text-center shadow-lg border-0 w-100 mx-3"
            style={{
              backgroundColor: '#2196F3',
              maxWidth: '500px',
              width: '100%',
              height: 'auto',
            }}
          >
            <h3 className="fw-bold text-white mb-4 fs-4 mt-2">Choose account</h3>

            <Row className="justify-content-center">
              <Col
                xs={6}
                sm={5}
                className="d-flex flex-column align-items-center mb-3"
              >
                <div
                  className="bg-primary rounded-4 d-flex justify-content-center align-items-center p-2"
                  style={{ width: '100%', maxWidth: '150px', height: '120px' }}
                  role="button"
                  onClick={() => navigate('/admin')}
                >
                  <img
                    src="/icons/admin.png"
                    alt="Admin"
                    style={{ width: '70px', height: '70px' }}
                  />
                </div>
                <span className="fw-bold text-white mt-2">Admin</span>
              </Col>

              <Col
                xs={6}
                sm={5}
                className="d-flex flex-column align-items-center mb-3"
              >
                <div
                  className="bg-primary rounded-4 d-flex justify-content-center align-items-center p-2"
                  style={{ width: '100%', maxWidth: '150px', height: '120px' }}
                  role="button"
                  onClick={() => navigate('/dermatologist')}
                >
                  <img
                    src="/icons/dermatologist.png"
                    alt="Dermatologist"
                    style={{ width: '70px', height: '70px' }}
                  />
                </div>
                <span className="fw-bold text-white mt-2">Dermatologist</span>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
