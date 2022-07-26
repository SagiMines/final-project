import { Form, Button } from 'react-bootstrap';
import FormInput from './FormInput';
import './ForgotPW3.css';

function ForgotPW3() {
  return (
    <div className="container forgotpw3-container">
      <h1 className="forgotpw3-title">Set A New Password</h1>
      <Form>
        <FormInput
          label="New password"
          type="password"
          placeholder="Enter a new password"
        />
        <FormInput
          label="Verify password"
          type="password"
          placeholder="Re-enter the password"
        />
        <Button className="forgotpw3-btn" type="submit">
          Apply changes
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPW3;
