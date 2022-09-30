import Form from 'react-bootstrap/Form';
import './styles/SelectForm.css';

function SelectForm(props) {
  return (
    <Form.Group className="mb-3">
      {props.label && <Form.Label>{props.label}</Form.Label>}
      <Form.Select
        defaultValue={props.defaultValue ? props.defaultValue : false}
        className="register-select"
        onBlur={props.onBlur}
        name={props.name}
      >
        <option value="title" disabled hidden>
          {props.title ? props.title : props.defaultValue}
        </option>
        {props.options.map((option, idx) => (
          <option key={idx.toString()} defaultValue={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectForm;
