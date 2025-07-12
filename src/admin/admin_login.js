import { Container, Row, Col, Form, InputGroup, Button} from 'react-bootstrap';
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
            <Form onSubmit={e => { e.preventDefault(); navigate('/admin/admin_dashboard'); }}>
              <Form.Group controlId="formEmail" className="mb-4">
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="rounded-0 border-bottom border-2 mb-3"
                    style={{ 
                        borderTop: 'none', 
                        borderLeft: 'none', 
                        borderRight: 'none',
                        padding: '10px 15px 10px'
                    }}
                  />
                  <InputGroup.Text className="bg-white border-0 border-bottom border-2 mb-3">
                    <img
                      src="/icons/person.svg"
                      alt="User Icon"
                      style={{ width: '2rem', height: '2rem' }}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Password field with icon */}
              <Form.Group controlId="formPassword" className="mb-4">
                <InputGroup>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="rounded-0 border-bottom border-2"
                    style={{ 
                        borderTop: 'none', 
                        borderLeft: 'none', 
                        borderRight: 'none',
                        padding: '10px 15px 10px' 
                    }}
                  />
                  <InputGroup.Text className="bg-white border-0 border-bottom border-2">
                    <img
                      src="/icons/password.png" 
                      alt="Password Icon"
                      style={{ width: '1.7rem', 
                        height: '1.7rem' 
                    }}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Login Button */}
              <div className="d-grid">
                <Button
                  type="submit"
                  className="rounded-1"
                  style={{ 
                    backgroundColor: '#0057FF', 
                    border: 'none',
                    padding: '10px 0',
                    fontSize: '1rem'
                }}
                >
                  LOGIN
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
