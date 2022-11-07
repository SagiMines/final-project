import { Card, Col } from 'react-bootstrap';
import AccountDetailsInput from './AccountDetailsInput';
import { useContext } from 'react';
import { UserContext } from './UserContext';
function MyAccountDetailsColumns(props) {
  const { user } = useContext(UserContext);
  return (
    <Col sm={6} md={6} lg={4}>
      <Card.Title>{`${props.columnInfo.title}:`}</Card.Title>
      {user && props.userInfo.changeInput === props.columnInfo.key && (
        <>
          <AccountDetailsInput
            placeHolder={props.columnInfo.title}
            currentValue={props.userInfo.user[props.userInfo.changeInput]}
            onClick={props.onInputChangeClick}
            onChange={props.onChangeInfo}
          />
          {props.userInfo.errorMessage && (
            <span className="input-error-user-details">
              {props.userInfo.errorMessage}
            </span>
          )}
        </>
      )}
      {!user && (
        <>
          <AccountDetailsInput
            inputKey={props.columnInfo.key}
            placeHolder={props.columnInfo.title}
            currentValue={
              props.columnInfo.key === props.userInfo.changeInput
                ? props.userInfo.user[props.columnInfo.key].value
                : ''
            }
            onClick={props.onInputChangeClick}
            onChange={props.onChangeInfo}
          />
          {props.userInfo.user[props.columnInfo.key].errorMessage && (
            <span className="input-error-user-details">
              {props.userInfo.user[props.columnInfo.key].errorMessage}
            </span>
          )}
        </>
      )}

      {user && props.userInfo.changeInput !== props.columnInfo.key && (
        <>
          <Card.Text
            className={
              !props.userInfo.user[props.columnInfo.key]
                ? 'no-details-provided'
                : false
            }
          >
            {props.userInfo.user[props.columnInfo.key]
              ? props.userInfo.user[props.columnInfo.key]
              : '*No data provided'}
          </Card.Text>

          {props.columnInfo.key !== 'email' && (
            <Card.Link
              onClick={props.onChangeClick}
              name={props.columnInfo.key}
            >
              Update
            </Card.Link>
          )}
        </>
      )}
    </Col>
  );
}

export default MyAccountDetailsColumns;
