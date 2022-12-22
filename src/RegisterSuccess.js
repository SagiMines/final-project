import { Card } from 'react-bootstrap';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './styles/RegisterSuccess.css';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { getReq } from './DAL/serverData';
import { useState } from 'react';
function RegisterSuccess() {
  const [searchParams] = useSearchParams();
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const removeGuest = () => {
    if (localStorage.getItem('guestCart')) {
      localStorage.removeItem('guestCart');
    }
    if (localStorage.getItem('guestWishlist')) {
      localStorage.removeItem('guestWishlist');
    }
  };

  const getNewUserName = async () => {
    const userData = await getReq(`users/${user.userId}`);
    setUserName(userData.firstName);
  };

  const removeAuthenticationSession = async () => {
    await getReq(`users/update-authentication${location.pathname}`);
  };

  useEffect(() => {
    removeAuthenticationSession();
    getNewUserName();
    removeGuest();

    setTimeout(() => {
      navigate(searchParams.get('from') ? '/review-order' : '/');
    }, 5000);
  }, []);

  return (
    <div className="container-center">
      <div className="container register-success-container">
        <h1 className="register-success-title">Success!</h1>
        <Card>
          {userName && (
            <Card.Body>
              <Card.Title>Dear {userName},</Card.Title>
              <Card.Text>
                You have successfully registered to our site.
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

export default RegisterSuccess;
