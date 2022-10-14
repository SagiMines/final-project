import { Card } from 'react-bootstrap';
import './styles/EmailConfirmation.css';

function EmailConfirmationPage() {
  return (
    <div className="container email-confirmation-container">
      <h1 className="email-confirmation-title">One More Step</h1>
      <Card>
        <Card.Body>
          <Card.Title>Dear User,</Card.Title>
          <Card.Text>
            You have Recieved a confirmation link via your email address.
          </Card.Text>
          <Card.Text>
            Please, connect to your email and confirm your registration.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EmailConfirmationPage;
