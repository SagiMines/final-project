import { useEffect, useState } from 'react';
import { getReq } from './DAL/serverData';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

function SearchSlider(props) {
  const [values, setValues] = useState();

  const showSearchResults = async () => {
    const searchResults = await getReq(`products/search?value=${props.value}`);
    // Limit the search to show only 5 products max
    searchResults.length = searchResults.length <= 5 ? searchResults.length : 5;
    setValues([...searchResults]);
  };

  useEffect(() => {
    showSearchResults();
  }, [props.value]);
  return (
    <>
      {values && values.length > 0 && (
        <Row
          className={
            values.length === 1
              ? `${props.name}-slider length-1`
              : values.length === 2
              ? `${props.name}-slider length-2`
              : values.length === 3
              ? `${props.name}-slider length-3`
              : values.length === 4
              ? `${props.name}-slider length-4`
              : `${props.name}-slider length-5`
          }
        >
          {values.map((value, idx) => (
            <Col key={idx.toString()}>
              <Link to={`/product/${value.id}`}>
                <Row className="search-result">
                  <Col className="search-result-product-image-container">
                    <img src={value.productImages[0].imageSrc}></img>
                  </Col>
                  <Col>
                    <label className="nav-slider-name">
                      {value.productName.length > 25
                        ? `${value.productName.substring(0, 25)}...`
                        : value.productName}
                    </label>
                  </Col>
                </Row>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default SearchSlider;
