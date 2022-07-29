import Form from 'react-bootstrap/Form';

function SortBy(props) {
  return (
    <Form.Select aria-label="Default select example">
      <option disabled selected hidden>
        Sort by
      </option>
      {props.options.map((option, idx) => (
        <option key={idx.toString()} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}

export default SortBy;
