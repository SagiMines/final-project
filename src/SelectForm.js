import Form from 'react-bootstrap/Form';
import './styles/SelectForm.css';

function SelectForm(props) {
  return (
    <Form.Group className="mb-3">
      {props.label && <Form.Label>{props.label}</Form.Label>}
      <Form.Select
        onBlur={props.onBlur}
        name={props.name}
        aria-label="Default select example"
      >
        <option value="title" disabled selected hidden>
          {props.title}
        </option>
        {props.options.map((option, idx) => (
          <option key={idx.toString()} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectForm;
