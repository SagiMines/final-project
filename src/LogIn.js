import { Form, Button, Container } from 'react-bootstrap';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import './styles/LogIn.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getReq,
  postReq,
  isConnected,
  getUserIdFromCookie,
} from './DAL/serverData';
import { UserContext } from './UserContext';

function LogIn(props) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const checkIfConnected = async () => {
    if (await isConnected()) {
      navigate('/');
    }
  };

  const [state, setState] = useState({
    user: { email: '', password: '' },
    passed: true,
    approved: true,
  });

  const handleClick = async e => {
    e.preventDefault();
    const isOkay = await postReq('login', state.user);

    if (isOkay && isOkay !== 502) {
      setUser({ userId: await getUserIdFromCookie() });
      let savedGuestOrder;
      if (localStorage.getItem('guestCart')) {
        if (props.guestOrder) {
          savedGuestOrder = JSON.parse(localStorage.getItem('guestCart'));
          console.log(savedGuestOrder);
          for (const order of savedGuestOrder) {
            order.userId = await getUserIdFromCookie();
          }
        }
        localStorage.removeItem('guestCart');
      }
      if (localStorage.getItem('guestWishlist')) {
        localStorage.removeItem('guestWishlist');
      }
      if (props.guestOrder) {
        navigate('/review-order', { state: savedGuestOrder });
      } else {
        navigate('/');
      }
    } else if (isOkay === 502) {
      state.approved = false;
      console.log('here');
      setState({ ...state });
    } else {
      state.passed = false;
      setState({ ...state });
    }
  };

  const handleChange = e => {
    state.user[e.target.name] = e.target.value;
    setState({ ...state });
  };

  const sendVerificationLink = async () => {
    const sendVerificationLink = await getReq(
      `users/send-verification-link?email=${state.user.email}`
    );
    if (sendVerificationLink) {
      console.log('Mail sent');
    }
  };

  useEffect(() => {
    checkIfConnected();
  }, []);

  return (
    <>
      {props.page !== 'shipping-details' && (
        <div className="container-center">
          {!props.guestOrder && (
            <div className="container login-container">
              <Form>
                <h1 className="login-title">Log In</h1>
                <FormInput
                  onChange={handleChange}
                  label="Email address"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
                <FormInput
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                />

                {!state.passed && (
                  <p className="login-error">Wrong Email/Password</p>
                )}
                {!state.approved && (
                  <>
                    <p className="login-error">
                      This user has not been verified yet.
                    </p>
                    <p className="login-error">
                      <a
                        className="verification-link"
                        onClick={sendVerificationLink}
                      >
                        Click here
                      </a>{' '}
                      to recieve a new verification mail to this user
                    </p>
                  </>
                )}
                <Button
                  onClick={handleClick}
                  className="login-btn"
                  variant="primary"
                  type="submit"
                >
                  Log In
                </Button>
                <section className="login-options">
                  <Link to="/forgot-password">Forgot password</Link>
                  <Link to="/register">Register</Link>
                </section>
              </Form>
            </div>
          )}
          {props.guestOrder && (
            <Form>
              {/* <h1 className="login-title">Log In</h1> */}
              <FormInput
                onChange={handleChange}
                label="Email:"
                type="email"
                name="email"
                placeholder="Email"
                guestOrder={true}
              />
              <FormInput
                onChange={handleChange}
                label="Password:"
                type="password"
                name="password"
                placeholder="Password"
                guestOrder={true}
              />

              {!state.passed && (
                <p className="login-error">Wrong Email/Password</p>
              )}
              {!state.approved && (
                <>
                  <p className="login-error">
                    This user has not been verified yet.
                  </p>
                  <p className="login-error">
                    <a
                      className="verification-link"
                      onClick={sendVerificationLink}
                    >
                      Click here
                    </a>{' '}
                    to recieve a new verification mail to this user
                  </p>
                </>
              )}
              <Button
                onClick={handleClick}
                className="login-btn"
                variant="primary"
                type="submit"
              >
                Log In
              </Button>
              <section className="login-options">
                <Link to="/forgot-password">Forgot password</Link>
                <Link to="/register">Register</Link>
              </section>
            </Form>
          )}
        </div>
      )}
      {props.page === 'shipping-details' && (
        <>
          {!props.guestOrder && (
            <div className="container login-container">
              <Form>
                <h1 className="login-title">Log In</h1>
                <FormInput
                  onChange={handleChange}
                  label="Email address"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
                <FormInput
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                />

                {!state.passed && (
                  <p className="login-error">Wrong Email/Password</p>
                )}
                {!state.approved && (
                  <>
                    <p className="login-error">
                      This user has not been verified yet.
                    </p>
                    <p className="login-error">
                      <a
                        className="verification-link"
                        onClick={sendVerificationLink}
                      >
                        Click here
                      </a>{' '}
                      to recieve a new verification mail to this user
                    </p>
                  </>
                )}
                <Button
                  onClick={handleClick}
                  className="login-btn"
                  variant="primary"
                  type="submit"
                >
                  Log In
                </Button>
                <section className="login-options">
                  <Link to="/forgot-password">Forgot password</Link>
                  <Link to="/register">Register</Link>
                </section>
              </Form>
            </div>
          )}
          {props.guestOrder && (
            <Form>
              {/* <h1 className="login-title">Log In</h1> */}
              <FormInput
                onChange={handleChange}
                label="Email:"
                type="email"
                name="email"
                placeholder="Email"
                guestOrder={true}
              />
              <FormInput
                onChange={handleChange}
                label="Password:"
                type="password"
                name="password"
                placeholder="Password"
                guestOrder={true}
              />

              {!state.passed && (
                <p className="login-error">Wrong Email/Password</p>
              )}
              {!state.approved && (
                <>
                  <p className="login-error">
                    This user has not been verified yet.
                  </p>
                  <p className="login-error">
                    <a
                      className="verification-link"
                      onClick={sendVerificationLink}
                    >
                      Click here
                    </a>{' '}
                    to recieve a new verification mail to this user
                  </p>
                </>
              )}
              <Button
                onClick={handleClick}
                className="login-btn"
                variant="primary"
                type="submit"
              >
                Log In
              </Button>
              <section className="login-options">
                <Link to="/forgot-password">Forgot password</Link>
                <Link to="/register">Register</Link>
              </section>
            </Form>
          )}
        </>
      )}
    </>
  );
}

export default LogIn;
