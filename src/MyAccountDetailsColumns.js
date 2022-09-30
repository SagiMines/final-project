import { Card, Col } from 'react-bootstrap';
import AccountDetailsInput from './AccountDetailsInput';
function MyAccountDetailsColumns(props) {
  return (
    <Col sm={6} md={6} lg={4}>
      <Card.Title>{`${props.columnInfo.title}:`}</Card.Title>
      {props.userInfo.changeInput === props.columnInfo.key && (
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

      {props.userInfo.changeInput !== props.columnInfo.key && (
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
