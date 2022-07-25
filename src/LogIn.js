import { Form, Button } from 'react-bootstrap';
import './LogIn.css';

function LogIn() {
  return (
    <div className="container login-container">
      <Form>
        <h1 className="login-title">Log In</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>
        <Button className="login-btn" variant="primary" type="submit">
          Log In
        </Button>
        <section className="login-options">
          <a>Forgot Password</a>
          <a>Register</a>
        </section>
      </Form>
    </div>
  );
}

export default LogIn;
