import Form from 'react-bootstrap/Form';

function SortBy(props) {
  return (
    <Form.Select className="sort-by-products" onChange={props.onChange}>
      <option disabled selected hidden>
        Sort by
      </option>
      {props.options.map((option, idx) => (
        <option key={idx.toString()} value={option.value}>
          {option.title}
        </option>
      ))}
    </Form.Select>
  );
}

export default SortBy;
