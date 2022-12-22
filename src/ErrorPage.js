import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './styles/ErrorPage.css';

function ErrorPage(props) {
  const navigate = useNavigate();
  return (
    <Row className="container-center error-page">
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        xxl={6}
        className="error-page-data"
      >
        <Row>
          <div>
            <Col>
              <span className="error-page-title">
                {props.page === 'not-found'
                  ? 'Lost on the way?'
                  : 'We are sorry...'}
              </span>
            </Col>
            <Col>
              <span className="error-page-description">
                {props.page === 'not-found'
                  ? `It looks like the page doesn't exist - please check the URL and
                try again.`
                  : `It looks like you don't have access to the page you requested.`}
              </span>
            </Col>
            <Col className="error-page-button-col">
              <Link to="/">
                <Button className="error-page-button">Explore Our Site</Button>
              </Link>
              <Button
                className="error-page-button"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
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
        className="error-page-image"
      >
        <img
          src={`/${props.page === 'not-found' ? 'not-found' : 'forbidden'}.jpg`}
        />
      </Col>
    </Row>
  );
}

export default ErrorPage;
