import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/MyAccount.css';

function MyAccount() {
  return (
    <div className="container my-account-container">
      <h1 className="my-account-title">Your Details</h1>
      <Card>
        <Card.Body>
          <Row className="my-account-row">
            <Col sm={6} md={6} lg={4}>
              <Card.Title>First name:</Card.Title>
              <Card.Text>Sagi</Card.Text>
              <Card.Link>update</Card.Link>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Last name:</Card.Title>
              <Card.Text>Mines</Card.Text>
              <Card.Link>update</Card.Link>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Phone number:</Card.Title>
              <Card.Text>0528850658</Card.Text>
              <Card.Link>update</Card.Link>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Email:</Card.Title>
              <Card.Text>sagi1236@gmail.com</Card.Text>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>City:</Card.Title>
              <Card.Text>Ashkelon</Card.Text>
              <Card.Link>update</Card.Link>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Country:</Card.Title>
              <Card.Text>Israel</Card.Text>
              <Card.Link>update</Card.Link>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Postal code:</Card.Title>
              <Card.Text>784565</Card.Text>
              <Card.Link>update</Card.Link>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Address:</Card.Title>
              <Card.Text>Ha'Onot 6</Card.Text>
              <Card.Link>update</Card.Link>
            </Col>
          </Row>
          <Link to="/change-password">
            <Button className="my-account-btn">Update password</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyAccount;
