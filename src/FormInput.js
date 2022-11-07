import { Form } from 'react-bootstrap';

function FormInput(props) {
  return (
    <Form.Group className="mb-3">
      {props.label && (
        <Form.Label className={props.guestOrder ? 'card-title h5' : undefined}>
          {props.label}
        </Form.Label>
      )}
      <Form.Control
        onChange={props.onChange}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onBlur={props.onBlur ? props.onBlur : undefined}
      />
    </Form.Group>
  );
}

export default FormInput;
