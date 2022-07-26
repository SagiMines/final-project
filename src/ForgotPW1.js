import { Card, Form, Button } from 'react-bootstrap';
import FormInput from './FormInput';
import './ForgotPW1.css';

function ForgotPW1() {
  return (
    <div className="container forgotpw1-container">
      <h1 className="forgotpw1-title">Password Recovery</h1>
      <Card>
        <Card.Body>
          <Card.Title>Verification</Card.Title>
          <Card.Text>
            You will recieve a one-time code to your Email address in order to
            reset your old password.
          </Card.Text>
          <Form>
            <FormInput type="email" placeholder="Enter email address" />
            <Button className="forgotpw1-btn" type="submit">
              Get the code
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ForgotPW1;
