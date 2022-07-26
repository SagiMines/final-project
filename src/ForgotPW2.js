import { Card, Form, Button } from 'react-bootstrap';
import FormInput from './FormInput';
import './ForgotPW2.css';

function ForgotPW2() {
  return (
    <div className="container forgotpw2-container">
      <h1 className="forgotpw2-title">Password Recovery</h1>
      <Card>
        <Card.Body>
          <Card.Title>Verification</Card.Title>
          <Card.Text>Please enter the code before the time runs out.</Card.Text>
          <Card.Text>*counter*</Card.Text>
          <Form>
            <FormInput type="text" placeholder="Enter the code" />
            <Button className="forgotpw2-btn" type="submit">
              Continue
            </Button>
          </Form>
          <Card.Text className="resend-text">
            If you have not recieved the code{' '}
            <Card.Link className="resend-link">click here</Card.Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ForgotPW2;
