import { Form, Button, Row, Col } from 'react-bootstrap';
import FormInput from './FormInput';
import './Register.css';

function Register() {
  return (
    <div className="container register-container">
      <Form>
        <h1 className="register-title">Register</h1>
        <Row>
          <Col md={6}>
            <FormInput
              label="First name"
              type="text"
              placeholder="Enter first name"
            />
          </Col>
          <Col md={6}>
            <FormInput
              label="Last name"
              type="text"
              placeholder="Enter last name"
            />
          </Col>
          <Col md={6}>
            <FormInput
              label="Phone number"
              type="tel"
              placeholder="Enter phone number"
            />
          </Col>
          <Col md={6}>
            <FormInput
              label="Email address"
              type="email"
              placeholder="Enter email"
            />
          </Col>
          <Col md={6}>
            <FormInput
              label="Address"
              type="text"
              placeholder="Enter address"
            />
          </Col>
          <Col md={6}>
            <FormInput label="City" type="text" placeholder="Enter city" />
          </Col>
          <Col md={6}>
            <FormInput
              label="Country"
              type="text"
              placeholder="Enter country"
            />
          </Col>
          <Col md={6}>
            <FormInput
              label="Postal code"
              type="number"
              placeholder="Enter postal code"
            />
          </Col>
          <Col md={6}>
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter password"
            />
          </Col>
          <Col md={6}>
            <FormInput
              label="Verify password"
              type="password"
              placeholder="Re-enter password"
            />
          </Col>
        </Row>
        <Button className="register-btn" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
