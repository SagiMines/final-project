import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/NotFound.css';

function NotFound() {
  return (
    <Row className="container-center not-found">
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        xxl={6}
        className="not-found-data"
      >
        <Row>
          <div>
            <Col>
              <span className="not-found-title">Lost on the way?</span>
            </Col>
            <Col>
              <span className="not-found-description">
                It looks like the page doesn't exist - please check the URL and
                try again.
              </span>
            </Col>
            <Col className="not-found-button-col">
              <Link to="/">
                <Button className="not-found-button">Explore Our Site</Button>
              </Link>
            </Col>
          </div>
        </Row>
      </Col>
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        xxl={6}
        className="not-found-image"
      >
        <img src="/not-found.jpg" />
      </Col>
    </Row>
  );
}

export default NotFound;
