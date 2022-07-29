import { Form, Button } from 'react-bootstrap';
import FormInput from './FormInput';
import './styles/LogIn.css';

function LogIn() {
  return (
    <div className="container login-container">
      <Form>
        <h1 className="login-title">Log In</h1>
        <FormInput
          label="Email address"
          type="email"
          placeholder="Enter email"
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter password"
        />
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
