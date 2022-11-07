import { Form, Button } from 'react-bootstrap';
import FormInput from './FormInput';
import './styles/ChangePassword.css';
import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { getReq, patchReq, postReq } from './DAL/serverData';
import { useNavigate } from 'react-router-dom';

function ChangePassword(props) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({
    oldPassword: {
      value: null,
      error: null,
    },
    newPassword: {
      value: null,
      error: null,
    },
    verifyPassword: {
      value: null,
      error: null,
    },
  });

  const handleChange = e => {
    let currentValueName = e.target.name.split(' ');
    currentValueName[1] =
      currentValueName[1].charAt(0).toUpperCase() +
      currentValueName[1].slice(1);
    currentValueName = currentValueName.join('');

    switch (currentValueName) {
      case 'newPassword':
        newPasswordCheck(e, currentValueName);
        break;
      case 'verifyPassword':
        if (values.newPassword.value && values.newPassword.value.length) {
          verifyPasswordCheck(e, currentValueName);
        }
        if (
          values.newPassword.value &&
          (!values.verifyPassword.value || !values.verifyPassword.value.length)
        ) {
          values.verifyPassword.error = null;
        }
        break;
      default:
        console.log('Wrong input');
    }
    setValues({ ...values });
  };

  const verifyPasswordCheck = (e, valueName) => {
    values[valueName].value = e.target.value;
    values[valueName].error =
      e.target.value !== values.newPassword.value
        ? `Passwords don't match`
        : null;
    setValues({ ...values });
  };

  const checkIfPasswordIsCorrect = async e => {
    const enteredPassword = e.target.value;
    values.oldPassword.value = enteredPassword;
    const isPasswordCorrect = await postReq(`users/${user.userId}`, {
      enteredPassword,
    });
    if (isPasswordCorrect) {
      values.oldPassword.error = null;
    } else {
      values.oldPassword.error = '* Wrong password entered';
    }
    setValues({ ...values });
  };

  const newPasswordCheck = (e, valueName) => {
    values[valueName].value = e.target.value;
    values[valueName].error =
      e.target.value.length > 250
        ? "* Password can't be longer than 250 characters"
        : e.target.value.length < 10 && e.target.value.length !== 0
        ? '* Password must be atleast 10 characters'
        : e.target.value.length === 0
        ? "* Password can't be empty"
        : null;
    setValues({ ...values });
  };

  const updatePassword = async () => {
    let userDetails;
    do {
      userDetails =
        props.page !== 'update'
          ? await getReq(`users/forgotten-password-user`)
          : await getReq(`users/${user.userId}`);
    } while (!userDetails);

    userDetails.password = values.newPassword.value;
    const isUserPasswordUpdated = await patchReq(
      `users/${userDetails.id}`,
      userDetails
    );
    if (isUserPasswordUpdated) {
      navigate('/change-password-success');
    }
  };

  const handleClick = async e => {
    e.preventDefault();

    const entriesArr = Object.entries(values);
    entriesArr.forEach(entry => {
      if (entry[1].value === null) {
        entry[1].error = "* Password can't be empty";
        values[entry[0]].error = entry[1].error;
      }
    });

    setValues({ ...values });

    let errorsArr = Object.values(values).map(input => input.error);
    if (!props.page) {
      errorsArr = errorsArr.slice(1, errorsArr.length);
    }
    const AreThereErrors = errorsArr.find(error => error);

    if (!AreThereErrors) {
      await updatePassword();
    }
  };

  return (
    <div className="container update-password-container">
      <h1 className="update-password-title">
        {props.page === 'update' ? 'Update Password' : 'Set A New Password'}
      </h1>
      <Form>
        {props.page === 'update' && (
          <FormInput
            name="old password"
            label="Old password"
            type="password"
            placeholder="Enter your old password"
            onBlur={checkIfPasswordIsCorrect}
          />
        )}
        {props.page === 'update' && values.oldPassword.error && (
          <p className="input-error">{values.oldPassword.error}</p>
        )}

        <FormInput
          name="new password"
          label="New password"
          type="password"
          placeholder="Enter a new password"
          onChange={handleChange}
        />
        {values.newPassword.error && (
          <p className="input-error">{values.newPassword.error}</p>
        )}

        <FormInput
          name="verify password"
          label="Verify password"
          type="password"
          placeholder="Re-enter the password"
          onChange={handleChange}
        />
        {values.verifyPassword.error && (
          <p className="input-error">{values.verifyPassword.error}</p>
        )}

        <Button
          className="update-password-btn"
          type="submit"
          onClick={handleClick}
        >
          Apply changes
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
