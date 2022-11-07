import { Form, Button, InputGroup } from 'react-bootstrap';
import countryList from 'country-list';
import SelectForm from './SelectForm';
import { useContext } from 'react';
import { UserContext } from './UserContext';

function AccountDetailsInput(props) {
  const { user } = useContext(UserContext);
  return (
    <InputGroup className="mb-3">
      {props.placeHolder !== 'Country' && (
        <Form.Control
          name={!user ? props.inputKey : undefined}
          className="update-value"
          placeholder={props.placeHolder}
          onChange={props.onChange}
          defaultValue={props.currentValue ? props.currentValue : ''}
        />
      )}
      {props.placeHolder === 'Country' && (
        <SelectForm
          onBlur={props.onChange}
          className="update-value"
          name="country"
          options={countryList.getNames()}
          placeholder={props.placeHolder}
          defaultValue={props.currentValue ? props.currentValue : ''}
        />
      )}
      {user && <Button onClick={props.onClick}>Update</Button>}
    </InputGroup>
  );
}

export default AccountDetailsInput;
