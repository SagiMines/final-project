import FormInput from './FormInput';
import { contactUsFormDetails } from './data/data';
import './styles/ContactUs.css';
import { Col, Row } from 'react-bootstrap';
function ContactUs() {
  return (
    <div className="contact-us zigzag-content">
      <Row className="contact-us-container">
        <h1 className="contact-us-title">Contact Us</h1>
        <h4 className="contact-us-subtitle">Let's Start a Conversation</h4>
        {contactUsFormDetails().map(formSection => (
          <FormInput {...formSection} />
        ))}
      </Row>
    </div>
  );
}

export default ContactUs;
