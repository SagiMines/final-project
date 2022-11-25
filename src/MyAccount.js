import { Button, Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/MyAccount.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { getReq, patchReq } from './DAL/serverData';
import XRegExp from 'xregexp';
import MyAccountDetailsColumns from './MyAccountDetailsColumns';
import _ from 'lodash';
import LoadingGif from './LoadingGif';

function MyAccount() {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});

  // The main funtion that changes the user data and updates the DB
  const onInputChangeClick = async () => {
    switch (userInfo.changeInput) {
      case 'firstName':
      case 'lastName':
        if (
          isInputValid(
            50,
            deCamelizeKey(userInfo.changeInput),
            {
              pattern: 'alphabetic',
              chars: 'characters',
            },
            XRegExp('^\\p{L}*$').test(userInfo.changeInputValue)
          )
        ) {
          updateUserData();
        }
        break;
      case 'address':
        if (
          isInputValid(
            100,
            deCamelizeKey(userInfo.changeInput),
            {
              pattern: 'alpha-numeric',
              chars: 'characters',
            },
            !/[!@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]+/.test(
              userInfo.changeInputValue
            )
          )
        ) {
          updateUserData();
        }
        break;
      case 'country':
        updateUserData();
        break;
      case 'city':
        if (
          isInputValid(
            80,
            deCamelizeKey(userInfo.changeInput),
            {
              pattern: 'alphabetic',
              chars: 'characters',
            },
            XRegExp('^\\p{L}*$').test(userInfo.changeInputValue)
          )
        ) {
          updateUserData();
        }
        break;
      case 'postalCode':
        if (
          isInputValid(
            10,
            deCamelizeKey(userInfo.changeInput),
            {
              pattern: 'numeric',
              chars: 'digits',
            },
            /^[0-9]*$/.test(userInfo.changeInputValue)
          )
        ) {
          updateUserData();
        }
        break;
      case 'phone':
        if (
          isInputValid(
            24,
            deCamelizeKey(userInfo.changeInput),
            {
              pattern: 'numeric',
              chars: 'digits',
            },
            /^[0-9]*$/.test(userInfo.changeInputValue)
          )
        ) {
          updateUserData();
        }
        break;
      default:
        console.log('Wrong input');
    }
  };

  // Gets the user information from the DB
  const getUserInfo = async () => {
    userInfo.user = await getReq(`users/${user.userId}`);
    delete userInfo.user.id;
    setUserInfo({ ...userInfo });
  };

  // Checks if there is a value already and sets it, if not: undefined
  const onChangeClick = e => {
    userInfo.changeInputValue = userInfo.user[e.target.name]
      ? userInfo.user[e.target.name]
      : undefined;
    userInfo.changeInput = e.target.name;
    setUserInfo({ ...userInfo });
  };

  // Updates the value on every change the user do in the input
  const onChangeInfo = e => {
    userInfo.changeInputValue = e.target.value;

    setUserInfo({ ...userInfo });
  };

  // Gets the user data from the DB and saves it to the state
  const updateUserData = async () => {
    userInfo.user[userInfo.changeInput] = userInfo.changeInputValue;
    const isUpdatedSuccessfully = await patchReq(
      `users/${user.userId}`,
      userInfo.user
    );
    if (isUpdatedSuccessfully) {
      console.log('Successfully updated the database');
      userInfo.changeInput = null;
    }
    setUserInfo({ ...userInfo });
  };

  // Checks if the current input the user has entered is valid
  const isInputValid = (maxLength, inputName, inputPattern, regexCheck) => {
    if (checkInputValidations(regexCheck, maxLength)) {
      userInfo.errorMessage = null;
      setUserInfo({ ...userInfo });
      return true;
    }
    userInfo.errorMessage = `* ${inputName} should be only ${inputPattern.pattern} and not longer than ${maxLength} ${inputPattern.chars}.`;
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
    getUserInfo();
  }, []);

  return (
    <div className="container-center">
      <div className="container my-account-container">
        <h1 className="my-account-title">Your Details</h1>
        {_.isEmpty(userInfo) && <LoadingGif />}
        {userInfo.user && (
          <Card>
            <Card.Body>
              <Row className="my-account-row">
                {Object.keys(userInfo.user).map(
                  (key, idx) =>
                    key !== 'password' && (
                      <MyAccountDetailsColumns
                        key={idx.toString()}
                        userInfo={userInfo}
                        columnInfo={{ title: deCamelizeKey(key), key }}
                        onInputChangeClick={onInputChangeClick}
                        onChangeInfo={onChangeInfo}
                        onChangeClick={onChangeClick}
                      />
                    )
                )}
              </Row>

              <Link to="/change-password">
                <Button className="my-account-btn">Update password</Button>
              </Link>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}

export default MyAccount;
