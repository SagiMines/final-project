import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles/PasswordChangeSuccess.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function PasswordChangeSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const removeGuest = () => {
    if (localStorage.getItem('guestCart')) {
      localStorage.removeItem('guestCart');
    }
    if (localStorage.getItem('guestWishlist')) {
      localStorage.removeItem('guestWishlist');
    }
  };

  useEffect(() => {
    if (searchParams.get('from')) {
      removeGuest();
      setTimeout(() => {
        navigate('/review-order');
        window.location.reload();
      }, 5000);
    } else {
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  }, []);
  return (
    <div className="container-center">
      <div className="container pw-changed-container">
        <h1 className="pw-changed-title">Password Changed Successfully!</h1>
        <Card>
          <Card.Body>
            <Card.Title>Dear User,</Card.Title>
            <Card.Text>You have successfully changed your password.</Card.Text>
            <Card.Text>
              You will be redirected to{' '}
              {searchParams.get('from')
                ? 'your order shortly.'
                : 'the main page shortly.'}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default PasswordChangeSuccess;
