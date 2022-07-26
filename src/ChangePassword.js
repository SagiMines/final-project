import { Form, Button } from 'react-bootstrap';
import FormInput from './FormInput';
import './ChangePassword.css';

function ChangePassword(props) {
  return (
    <div className="container update-password-container">
      <h1 className="update-password-title">
        {props.page === 'update' ? 'Update Password' : 'Set A New Password'}
      </h1>
      <Form>
        {props.page === 'update' && (
          <FormInput
            label="Old password"
            type="password"
            placeholder="Enter your old password"
          />
        )}
        <FormInput
          label="New password"
          type="password"
          placeholder="Enter a new password"
        />
        <FormInput
          label="Verify password"
          type="password"
          placeholder="Re-enter the password"
        />
        <Button className="update-password-btn" type="submit">
          Apply changes
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
