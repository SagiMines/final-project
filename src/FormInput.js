import { Form } from 'react-bootstrap';

function FormInput(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control type={props.type} placeholder={props.placeholder} />
    </Form.Group>
  );
}

export default FormInput;
