import { Form, Button, InputGroup } from 'react-bootstrap';
import countryList from 'country-list';
import SelectForm from './SelectForm';

function AccountDetailsInput(props) {
  return (
    <InputGroup className="mb-3">
      {props.placeHolder !== 'Country' && (
        <Form.Control
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
      <Button onClick={props.onClick}>Update</Button>
    </InputGroup>
  );
}

export default AccountDetailsInput;
