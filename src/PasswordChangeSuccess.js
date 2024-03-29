import { Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/PasswordChangeSuccess.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReq } from './DAL/serverData';
import { useContext } from 'react';
import { UserContext } from './UserContext';

function PasswordChangeSuccess() {
  const [searchParams] = useSearchParams();
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const removeGuest = () => {
    if (localStorage.getItem('guestCart')) {
      localStorage.removeItem('guestCart');
    }
    if (localStorage.getItem('guestWishlist')) {
      localStorage.removeItem('guestWishlist');
    }
  };

  const getUserName = async () => {
    let userData;
    // Get user name when in the process of an order
    if (searchParams.get('token')) {
      const encryptedUserEmail = encodeURIComponent(
        searchParams.get('token').split(' ').join('+')
      );
      userData = await getReq(
        `users/forgotten-password-user?email=${encryptedUserEmail}`
      );
      // Get user name when updating password
    } else {
      userData = await getReq(`users/${user.userId}`);
    }
    setUserName(userData.firstName);
  };
  const removeAuthenticationSession = async () => {
    await getReq(`users/update-authentication${location.pathname}`);
  };
  useEffect(() => {
    getUserName();
    if (searchParams.get('from')) {
      removeAuthenticationSession();
      removeGuest();
      setTimeout(() => {
        navigate('/review-order');
        window.location.reload();
      }, 5000);
    } else {
      setTimeout(() => {
        removeAuthenticationSession();
        navigate('/');
      }, 5000);
    }
  }, []);
  return (
    <div className="container-center">
      <div className="container pw-changed-container">
        <h1 className="pw-changed-title">Password Changed Successfully!</h1>
        <Card>
          {userName && (
            <Card.Body>
              <Card.Title>Dear {userName},</Card.Title>
              <Card.Text>
                You have successfully changed your password.
              </Card.Text>
              <Card.Text>
                You will be redirected to{' '}
                {searchParams.get('from')
                  ? 'your order shortly.'
                  : 'the main page shortly.'}
              </Card.Text>
            </Card.Body>
          )}
        </Card>
      </div>
    </div>
  );
}

export default PasswordChangeSuccess;
