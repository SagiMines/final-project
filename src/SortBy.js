import Form from 'react-bootstrap/Form';

function SortBy(props) {
  return (
    <Form.Select
      className="sort-by-products"
      onChange={props.onChange}
      defaultValue={0}
    >
      <option disabled hidden value={0}>
        Sort by
      </option>
      {props.options.map((option, idx) => (
        <option key={(idx + 1).toString()} value={option.value}>
          {option.title}
        </option>
      ))}
    </Form.Select>
  );
}

export default SortBy;
