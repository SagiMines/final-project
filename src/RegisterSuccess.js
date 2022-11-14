import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/RegisterSuccess.css';
import { useEffect } from 'react';
function RegisterSuccess() {
  const removeGuest = () => {
    if (localStorage.getItem('guestCart')) {
      localStorage.removeItem('guestCart');
    }
    if (localStorage.getItem('guestWishlist')) {
      localStorage.removeItem('guestWishlist');
    }
  };
  useEffect(() => {
    removeGuest();
  }, []);

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
