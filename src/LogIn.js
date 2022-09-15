import { Form, Button, Container } from 'react-bootstrap';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import './styles/LogIn.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postReq, isConnected, getUserIdFromCookie } from './DAL/serverData';
import { UserContext } from './UserContext';

function LogIn() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const checkIfConnected = async () => {
    if (await isConnected()) {
      navigate('/');
    }
  };

  const [state, setState] = useState({
    user: { email: '', password: '' },
    passed: true,
  });

  const handleClick = async e => {
    e.preventDefault();
    const isOkay = await postReq('login', state.user);
    if (isOkay) {
      setUser(getUserIdFromCookie());
      navigate('/');
    } else {
      state.passed = false;
      setState({ ...state });
    }
  };

  const handleChange = e => {
    state.user[e.target.name] = e.target.value;
    setState({ ...state });
  };

  useEffect(() => {
    checkIfConnected();
  }, []);

  return (
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

        {!state.passed && <p className="login-error">Wrong Email/Password</p>}
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
  );
}

export default LogIn;
