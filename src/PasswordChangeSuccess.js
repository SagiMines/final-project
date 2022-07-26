import { Button, Card } from 'react-bootstrap';
import './PasswordChangeSuccess.css';

function PasswordChangeSuccess() {
  return (
    <div className="container pw-changed-container">
      <h1 className="pw-changed-title">Password Changed Successfully!</h1>
      <Card>
        <Card.Body>
          <Card.Text>You have successfully changed your password.</Card.Text>
          <Button className="pw-changed-btn">Go to the main page</Button>
        </Card.Body>
      </Card>
      {/* <Form>
        <Form.Label></Form.Label>
        <Button className="forgotpw3-btn" type="submit">
          Apply changes
        </Button>
      </Form> */}
    </div>
  );
}

export default PasswordChangeSuccess;
