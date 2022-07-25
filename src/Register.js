import { Form, Button, Row, Col } from 'react-bootstrap';
import './Register.css';

function Register() {
  return (
    <div className="container register-container">
      <Form>
        <h1 className="register-title">Register</h1>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Enter country" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Postal code</Form.Label>
              <Form.Control type="number" placeholder="Enter postal code" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Verify password</Form.Label>
              <Form.Control type="password" placeholder="Re-enter password" />
            </Form.Group>
          </Col>
        </Row>
        <Button className="register-btn" variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
