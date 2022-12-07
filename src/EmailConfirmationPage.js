import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './styles/EmailConfirmation.css';

function EmailConfirmationPage(props) {
  const location = useLocation();

  return (
    <div className="container-center">
      <div className="container email-confirmation-container">
        <h1 className="email-confirmation-title">One More Step...</h1>
        <Card>
          <Card.Body>
            <Card.Title>Dear {location.state.userName},</Card.Title>
            <Card.Text>
              {props.page === 'register'
                ? 'You have recieved a confirmation link via your email address.'
                : 'You have recieved a link to change your password via your email address.'}
            </Card.Text>
            <Card.Text>
              {props.page === 'register'
                ? 'Please, connect to your email and confirm your registration.'
                : 'Please, connect to your email, enter the link and change your password.'}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default EmailConfirmationPage;
