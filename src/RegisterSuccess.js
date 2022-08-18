import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/RegisterSuccess.css';

function RegisterSuccess() {
  return (
    <div className="container register-success-container">
      <h1 className="register-success-title">Success!</h1>
      <Card>
        <Card.Body>
          <Card.Title>Dear User,</Card.Title>
          <Card.Text>You have successfully registered to our site.</Card.Text>
          <Card.Text>Welcome, and have fun!</Card.Text>
          <Link to="/">
            <Button className="register-success-button">
              Go to the main page
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterSuccess;
