import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/PasswordChangeSuccess.css';

function PasswordChangeSuccess() {
  return (
    <div className="container pw-changed-container">
      <h1 className="pw-changed-title">Password Changed Successfully!</h1>
      <Card>
        <Card.Body>
          <Card.Text>You have successfully changed your password.</Card.Text>
          <Link to="/">
            <Button className="pw-changed-btn">Go to the main page</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PasswordChangeSuccess;
