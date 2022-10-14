import { Form, Button, Row, Col } from 'react-bootstrap';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import './styles/Register.css';
import { useEffect, useState } from 'react';
import countryList from 'country-list';
import SelectForm from './SelectForm';
import { useNavigate } from 'react-router-dom';
import { getReq, postReq, isConnected } from './DAL/serverData';
import Cookies from 'js-cookie';

function Register() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    alerts: {
      firstname: '',
      lastname: '',
      email: '',
      country: '',
      password: '',
      repassword: '',
    },
    values: {
      firstname: null,
      lastname: null,
      email: null,
      country: null,
      password: null,
      repassword: null,
    },
  });

  const checkIfConnected = async () => {
    if (await isConnected()) {
      navigate('/');
    }
  };

  const handleClick = async e => {
    e.preventDefault();

    let checkEmail;

    // filter all the inputs with alerts
    const check = Object.entries(state.alerts).filter(
      value => value[1] !== null
    );

    // if the email is valid (to check if it is already in use)
    if (state.values.email && !state.alerts.email) {
      try {
        checkEmail = await getReq(`users?email=${state.values.email}`);
      } catch (err) {
        checkEmail = null;
      }
    }

    // if all the inputs are filled and the email is not in use
    if (!check.length && !checkEmail) {
      //Removing the repassword key
      delete state.values.repassword;
      //Changing the 'firstname' and 'lastname' keys to match the DTO on the server
      delete Object.assign(state.values, {
        ['firstName']: state.values['firstname'],
      })['firstname'];
      delete Object.assign(state.values, {
        ['lastName']: state.values['lastname'],
      })['lastname'];
      await postReq('register', state.values);
      navigate('/email-confirmation');
    } else {
      // if some of the inputs are not filled
      for (const value of check) {
        if (value[1] === '') {
          let name = value[0].charAt(0).toUpperCase() + value[0].slice(1);
          name =
            name === 'Lastname'
              ? 'Last name'
              : name === 'Firstname'
              ? 'First name'
              : name === 'Repassword'
              ? 'Password validation'
              : name;
          state.alerts[value[0]] = `* ${name} can't be empty`;
        }
      }

      //If the email is already in use
      if (checkEmail) {
        console.log(checkEmail);
        state.alerts.email = `* Email is already in use`;
      }

      setState({ ...state });
    }
  };

  const handleChange = e => {
    state.values[e.target.name] = e.target.value;
    switch (e.target.name) {
      case 'firstname':
      case 'lastname':
        state.alerts[e.target.name] =
          e.target.value.length > 50
            ? "* First name can't be longer than 50 characters"
            : e.target.value.length === 0
            ? "* First name can't be empty"
            : null;
        break;
      case 'country':
        state.alerts[e.target.name] =
          e.target.value === 'title' ? "* Country can't be empty" : null;
        break;
      case 'password':
        state.alerts[e.target.name] =
          e.target.value.length > 250
            ? "* Password can't be longer than 250 characters"
            : e.target.value.length < 10 && e.target.value.length !== 0
            ? '* Password must be atleast 10 characters'
            : e.target.value.length === 0
            ? "* Password can't be empty"
            : null;
        break;
      case 'email':
        state.alerts[e.target.name] =
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
            ? null
            : e.target.value.length === 0
            ? "* Email can't be empty"
            : '* Invalid email address';
        break;
      case 'repassword':
        state.alerts[e.target.name] =
          state.values.password !== e.target.value
            ? '* The password does not match'
            : null;
        break;
    }
    setState({ ...state });
  };

  useEffect(() => {
    checkIfConnected();
  }, []);

  return (
    <div className="container register-container">
      <Form>
        <h1 className="register-title">Register</h1>
        <Row>
          <Col md={6}>
            <FormInput
              onChange={handleChange}
              label="First name"
              type="text"
              name="firstname"
              placeholder="Enter first name"
            />
            {state.alerts.firstname && (
              <p className="alerts">{state.alerts.firstname}</p>
            )}
          </Col>

          <Col md={6}>
            <FormInput
              onChange={handleChange}
              label="Last name"
              type="text"
              name="lastname"
              placeholder="Enter last name"
            />
            {state.alerts.lastname && (
              <p className="alerts">{state.alerts.lastname}</p>
            )}
          </Col>
          <Col md={6}>
            <FormInput
              onChange={handleChange}
              label="Email address"
              type="email"
              name="email"
              placeholder="Enter email"
            />
            {state.alerts.email && (
              <p className="alerts">{state.alerts.email}</p>
            )}
          </Col>
          <Col md={6}>
            <SelectForm
              label="Country"
              name="country"
              title="Choose Country"
              options={countryList.getNames()}
              onBlur={handleChange}
            />
            {state.alerts.country && (
              <p className="alerts">{state.alerts.country}</p>
            )}
          </Col>
          <Col md={6}>
            <FormInput
              onChange={handleChange}
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
            />
            {state.alerts.password && (
              <p className="alerts">{state.alerts.password}</p>
            )}
          </Col>

          <Col md={6}>
            <FormInput
              onChange={handleChange}
              label="Verify password"
              type="password"
              name="repassword"
              placeholder="Re-enter password"
            />
            {state.alerts.repassword && (
              <p className="alerts">{state.alerts.repassword}</p>
            )}
          </Col>
        </Row>
        <Link to="/register-success">
          <Button className="register-btn" type="submit" onClick={handleClick}>
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Register;
