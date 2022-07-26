import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import FormInput from './FormInput';
import './MyAccount.css';

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
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Last name:</Card.Title>
              <Card.Text>Mines</Card.Text>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Phone number:</Card.Title>
              <Card.Text>0528850658</Card.Text>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Email:</Card.Title>
              <Card.Text>sagi1236@gmail.com</Card.Text>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>City:</Card.Title>
              <Card.Text>Ashkelon</Card.Text>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Country:</Card.Title>
              <Card.Text>Israel</Card.Text>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Postal code:</Card.Title>
              <Card.Text>784565</Card.Text>
            </Col>
            <Col sm={6} md={6} lg={4}>
              <Card.Title>Address:</Card.Title>
              <Card.Text>Ha'Onot 6</Card.Text>
            </Col>
          </Row>
          <Button className="my-account-btn">Update details</Button>
          <Button className="my-account-btn">Change password</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyAccount;
