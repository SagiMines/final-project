import { Form } from 'react-bootstrap';

function FormInput(props) {
  return (
    <Form.Group className="mb-3">
      {props.label && (
        <Form.Label className={props.guestOrder ? 'card-title h5' : undefined}>
          {props.label}
        </Form.Label>
      )}
      {!props.textArea && (
        <Form.Control
          onChange={props.onChange}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          onBlur={props.onBlur ? props.onBlur : undefined}
        />
      )}
      {props.textArea && (
        <Form.Control
          as="textarea"
          maxLength={150}
          rows={3}
          onChange={props.onChange}
          name={props.name}
          placeholder={props.placeholder}
        />
      )}
    </Form.Group>
  );
}

export default FormInput;
