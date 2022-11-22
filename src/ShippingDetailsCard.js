import { Card, Row, Accordion } from 'react-bootstrap';
import './styles/ShippingDetailsCard.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { getReq } from './DAL/serverData';
import Cookies from 'js-cookie';
import XRegExp from 'xregexp';
import { Link } from 'react-router-dom';
import MyAccountDetailsColumns from './MyAccountDetailsColumns';
import LogIn from './LogIn';

function ShippingDetailsCard(props) {
  const { user } = useContext(UserContext);
  const [orderData, setOrderData] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const getTheUserDetails = async () => {
    //User
    if (user) {
      orderData.userDetails = await getReq(`users/${user.userId}`);
      //Guest
    } else {
      orderData.userDetails = await getReq(
        `users/${Cookies.get('new-user-id')}`
      );
      console.log(Cookies.get('new-user-id'));
      Cookies.remove('new-user-id');
    }
    setOrderData({ ...orderData });
    areAllRequiredDetailsFilled();
  };

  const setGuestDetailsInputs = () => {
    userInfo.user = {
      firstName: {
        value: '',
        errorMessage: null,
      },
      lastName: {
        value: '',
        errorMessage: null,
      },
      address: {
        value: '',
        errorMessage: null,
      },
      country: {
        value: '',
        errorMessage: null,
      },
      city: {
        value: '',
        errorMessage: null,
      },
      postalCode: {
        value: '',
        errorMessage: null,
      },
      phone: {
        value: '',
        errorMessage: null,
      },
      email: {
        value: '',
        errorMessage: null,
      },
    };
    setOrderData({ ...orderData });
  };

  const areAllRequiredDetailsFilled = () => {
    let isNotFilled = false;
    for (const value of Object.values(orderData.userDetails)) {
      if (!value) {
        isNotFilled = true;
        break;
      }
    }

    if (isNotFilled) {
      orderData.shippingDetails = false;
    } else {
      orderData.shippingDetails = true;
    }
    setOrderData({ ...orderData });
  };

  const onInputChangeClick = async () => {
    switch (userInfo.changeInput) {
      case 'firstName':
      case 'lastName':
        await isInputValid(
          50,
          deCamelizeKey(userInfo.changeInput),
          {
            pattern: 'alphabetic',
            chars: 'characters',
          },
          XRegExp('^\\p{L}*$').test(userInfo.changeInputValue)
        );

        updateUserData();

        break;
      case 'address':
        await isInputValid(
          100,
          deCamelizeKey(userInfo.changeInput),
          {
            pattern: 'alpha-numeric',
            chars: 'characters',
          },
          !/[!@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]+/.test(
            userInfo.changeInputValue
          )
        );

        updateUserData();

        break;
      case 'country':
        updateUserData();
        break;
      case 'city':
        await isInputValid(
          80,
          deCamelizeKey(userInfo.changeInput),
          {
            pattern: 'alphabetic',
            chars: 'characters',
          },
          XRegExp('^\\p{L}*$').test(userInfo.changeInputValue)
        );

        updateUserData();

        break;
      case 'postalCode':
        await isInputValid(
          10,
          deCamelizeKey(userInfo.changeInput),
          {
            pattern: 'numeric',
            chars: 'digits',
          },
          /^[0-9]*$/.test(userInfo.changeInputValue)
        );

        updateUserData();

        break;
      case 'phone':
        await isInputValid(
          24,
          deCamelizeKey(userInfo.changeInput),
          {
            pattern: 'numeric',
            chars: 'digits',
          },
          /^[0-9]*$/.test(userInfo.changeInputValue)
        );

        updateUserData();

        break;
      case 'email':
        await isInputValid(
          50,
          deCamelizeKey(userInfo.changeInput),
          {
            pattern: 'email pattern',
            chars: 'characters',
          },
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            userInfo.changeInputValue
          )
        );
      default:
        console.log('Wrong input');

        updateUserData();
    }
  };

  // Updates the value on every change the user do in the input
  const onChangeInfo = e => {
    userInfo.changeInputValue = e.target.value;
    userInfo.changeInput = e.target.name;
    setUserInfo({ ...userInfo });
    onInputChangeClick();
  };

  // Gets the user data from the DB and saves it to the state
  const updateUserData = async () => {
    userInfo.user[userInfo.changeInput].value = userInfo.changeInputValue;
    setUserInfo({ ...userInfo });
    props.guestShippingDetailsState.setGuestShippingDetails({
      ...userInfo.user,
    });
  };

  // Checks if the current input the user has entered is valid
  const isInputValid = async (
    maxLength,
    inputName,
    inputPattern,
    regexCheck
  ) => {
    if (checkInputValidations(regexCheck, maxLength)) {
      if (userInfo.changeInput === 'email') {
        const isEmailExistInDb = await getReq(
          `users?email=${userInfo.changeInputValue}`
        );
        if (isEmailExistInDb) {
          userInfo.user[
            userInfo.changeInput
          ].errorMessage = `* This email already exists in our database, Please log in your account`;
          setUserInfo({ ...userInfo });
          return false;
        }
      }
      userInfo.user[userInfo.changeInput].errorMessage = null;
      setUserInfo({ ...userInfo });
      return true;
    }
    userInfo.user[
      userInfo.changeInput
    ].errorMessage = `* ${inputName} should be only ${inputPattern.pattern} and not longer than ${maxLength} ${inputPattern.chars}.`;
    setUserInfo({ ...userInfo });
    return false;
  };

  // Checks individual input validations
  const checkInputValidations = (regexCheck, maxLength) => {
    if (
      userInfo.changeInputValue &&
      regexCheck &&
      userInfo.changeInputValue.length <= maxLength &&
      userInfo.changeInputValue.length > 0
    ) {
      return true;
    }
    return false;
  };

  // Takes the key and makes it a title
  const deCamelizeKey = key => {
    let deCamelizedKey = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (str) {
        return str.toUpperCase();
      });
    deCamelizedKey =
      deCamelizedKey.charAt(0) + deCamelizedKey.slice(1).toLowerCase();
    return deCamelizedKey;
  };

  useEffect(() => {
    //User || Guest
    if (user || props.page === 'order-confirmation') {
      getTheUserDetails();
      //Guest
    } else {
      setGuestDetailsInputs();
    }
  }, []);
  return (
    <>
      {orderData.shippingDetails && (
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Button
              className={
                props.page === 'my-orders'
                  ? 'accordion-button-order-confirmation'
                  : false
              }
            >
              Shipping Details
            </Accordion.Button>

            <Accordion.Body>
              <Card className="shipping-details-card">
                {orderData.userDetails && (
                  <Card.Body>
                    <Card.Title>
                      {'Shipping Details '}
                      {props.page === 'review' && (
                        <Link className="change-address" to="/my-account">
                          Change
                        </Link>
                      )}
                    </Card.Title>

                    <Card.Text>{`${orderData.userDetails.firstName} ${orderData.userDetails.lastName}`}</Card.Text>
                    <Card.Text>{orderData.userDetails.phone}</Card.Text>
                    <Card.Text>{orderData.userDetails.address}</Card.Text>
                    <Card.Text>{orderData.userDetails.city}</Card.Text>
                    <Card.Text>{orderData.userDetails.postalCode}</Card.Text>
                    <Card.Text>{orderData.userDetails.country}</Card.Text>
                  </Card.Body>
                )}
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {!orderData.shippingDetails && user && props.page === 'review' && (
        <>
          <Card className="shipping-details-card">
            <Card.Body>
              <Card.Title>
                <Card.Text className="missing-shipping-details">
                  Please fill shipping details before proceeding
                </Card.Text>
                <Link className="change-address" to="/my-account">
                  Enter Shipping Details
                </Link>
              </Card.Title>
            </Card.Body>
          </Card>
        </>
      )}
      {userInfo.user && !user && props.page !== 'order-confirmation' && (
        <Card>
          <Card.Body>
            <Card.Title>Login to WorkShop:</Card.Title>
            <LogIn guestOrder={true} />
            <h4 className="user-guest-option-border">
              <span>Or</span>
            </h4>
            <Card.Title>Continue as a guest:</Card.Title>
            <Row className="my-account-row">
              {Object.keys(userInfo.user).map((key, idx) => (
                <MyAccountDetailsColumns
                  key={idx.toString()}
                  userInfo={userInfo}
                  columnInfo={{ title: deCamelizeKey(key), key }}
                  onChangeInfo={onChangeInfo}
                />
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default ShippingDetailsCard;
