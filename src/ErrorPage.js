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
          alt={
            props.page === 'not-found' ? '404 error image' : '403 error image'
          }
          title={props.page === 'not-found' ? '404 error' : '403 error'}
          referrerPolicy="no-referrer"
          src={
            props.page === 'not-found'
              ? 'https://lh3.googleusercontent.com/pw/AL9nZEUWo4Vc429gZWRUgm33ethsdwAGrSxlSXTSAoA3fK1AsTS3tofMoMDOTe9gwTsSBFEfgtG6W6-ohV7NackE3uPqVFNKwEnhENDyxmR_frdqZ49uVMP6qqpaf-8SAUC71rNiGNOKRJ2u7WBaZ6yHjIWq=w1134-h927-no?authuser=1'
              : 'https://lh3.googleusercontent.com/pw/AL9nZEUZpkpSvU-TCYUJyg-pkuR29XPSqtiy1rJqdJtISpK1Kg7e4zzepkB66170r5jcDeYHg5AOO4zIyZl2t3n2YaQXfOlQ26XscgHzcPiQvkpPLsKRrRjAPulB67hWcy-7iDGCMb20nFDa58OprHQpY9Ww=s927-no?authuser=1'
          }
        />
      </Col>
    </Row>
  );
}

export default ErrorPage;
