import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { getReq, postReq } from './DAL/serverData';
import FormInput from './FormInput';
import './styles/ForgotPW1.css';
import { useNavigate } from 'react-router-dom';

function ForgotPW1() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    value: null,
    error: null,
  });

  const emailCheck = userInput => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInput);
  };

  const handleChange = e => {
    const userInput = e.target.value;
    input.value = userInput;
    input.error = emailCheck(userInput)
      ? null
      : userInput.length === 0
      ? "* Email can't be empty"
      : '* Invalid email address';
    setInput({ ...input });
  };

  const handleClick = async e => {
    e.preventDefault();
    if (emailCheck(input.value)) {
      // const reqBody = { email: input.value };
      try {
        await getReq(`users?email=${input.value}`);
        const isEmailSent = await getReq(
          `users/forgot-password?email=${input.value}`
        );
        if (isEmailSent) {
          navigate('/email-confirmation-password');
        }
      } catch {
        input.error =
          '* This Email address is not related to any user in our database.';
      }
    }
    setInput({ ...input });
  };

  return (
    <div className="container forgotpw1-container">
      <h1 className="forgotpw1-title">Password Recovery</h1>
      <Card>
        <Card.Body>
          <Card.Title>Verification</Card.Title>
          <Card.Text>
            You will recieve a verification link to your Email address in order
            to reset your old password.
          </Card.Text>
          <Form>
            <FormInput
              onChange={handleChange}
              type="email"
              placeholder="Enter your email address"
            />
            {input.error && <p className="input-error">{input.error}</p>}
            <Button
              onClick={handleClick}
              className="forgotpw1-btn"
              type="submit"
            >
              Get the code
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ForgotPW1;
