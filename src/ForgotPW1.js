import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { getReq, patchReq, postReq } from './DAL/serverData';
import FormInput from './FormInput';
import './styles/ForgotPW1.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ForgotPW1() {
  const location = useLocation();
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
      try {
        const userData = await getReq(`users?email=${input.value}`);

        let isEmailSent;
        if (location.state && location.state.from === 'guest-cart') {
          const userCart = await getReq(`cart/${userData.id}`);
          //Unchecking everything in the user cart
          if (userCart.length) {
            for (const cartItem of userCart) {
              cartItem.checked = false;
              await patchReq('cart', cartItem);
            }
          }
          const guestCart = JSON.parse(localStorage.getItem('guestCart'));
          const filteredGuestCart = guestCart.filter(
            cartItem => cartItem.checked
          );
          for (const cartItem of filteredGuestCart) {
            cartItem.userId = userData.id;
            await postReq(`cart`, cartItem);
          }
          isEmailSent = await getReq(
            `users/forgot-password?email=${input.value}&from=${location.state.from}`
          );
        } else {
          isEmailSent = await getReq(
            `users/forgot-password?email=${input.value}`
          );
        }
        if (isEmailSent) {
          const userData = await getReq(`users?email=${input.value}`);
          navigate('/email-confirmation-password', {
            state: { userName: userData.firstName },
          });
        }
      } catch {
        input.error =
          '* This Email address is not related to any user in our database.';
      }
    }
    setInput({ ...input });
  };

  return (
    <div className="container-center">
      <div className="container forgotpw1-container">
        <h1 className="forgotpw1-title">Password Recovery</h1>
        <Card>
          <Card.Body>
            <Card.Title>Verification</Card.Title>
            <Card.Text>
              You will recieve a verification link to your Email address in
              order to reset your old password.
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
    </div>
  );
}

export default ForgotPW1;
