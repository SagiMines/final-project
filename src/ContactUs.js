import FormInput from './FormInput';
import { contactUsFormDetails } from './data/data';
import './styles/ContactUs.css';
import { Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { postReq } from './DAL/serverData';
function ContactUs() {
  const [contactUsData, setContactUsData] = useState({
    data: {
      fullName: {
        value: null,
        error: null,
      },
      email: {
        value: null,
        error: null,
      },
      subject: {
        value: null,
        error: null,
      },
      message: {
        value: null,
        error: null,
      },
    },
    messageSent: false,
    title: 'Contact Us',
    subTitle: "Let's Start a Conversation",
  });

  const handleChange = e => {
    contactUsData.data[e.target.name].value = e.target.value;
    switch (e.target.name) {
      case 'fullName':
      case 'subject':
        contactUsData.data[e.target.name].error =
          e.target.value.length > 50
            ? `* ${
                e.target.name === 'subject' ? 'Subject' : 'Full name'
              } can't be longer than 50 characters`
            : e.target.value.length === 0
            ? `* ${
                e.target.name === 'subject' ? 'Subject' : 'Full name'
              } can't be empty`
            : null;
        break;
      case 'email':
        contactUsData.data[e.target.name].error =
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
            ? null
            : e.target.value.length === 0
            ? "* Email can't be empty"
            : '* Invalid email address';
        break;
      case 'message':
        contactUsData.data[e.target.name].error =
          e.target.value.length === 0 ? "* The message can't be empty" : null;
        break;
      default:
        console.log('Wrong input');
    }
    setContactUsData({ ...contactUsData });
  };

  const handleClick = async () => {
    const contactUsDataValues = Object.values(contactUsData.data).map(
      input => input.value
    );
    const contactUsDataErrors = Object.values(contactUsData.data).map(
      input => input.error
    );

    const areMissingValuesEntered = contactUsDataValues.find(value => !value);
    const areThereErrors = contactUsDataErrors.find(value => value);
    if (areMissingValuesEntered === undefined && areThereErrors === undefined) {
      const reqBody = {
        fullName: contactUsData.data.fullName.value,
        email: contactUsData.data.email.value,
        subject: contactUsData.data.subject.value,
        message: contactUsData.data.message.value,
      };

      const isMessageRecieved = await postReq('contact-us', reqBody);
      contactUsData.messageSent = true;
      if (isMessageRecieved) {
        contactUsData.title = `We've Got It!`;
        contactUsData.subTitle = `Dear ${contactUsData.data.fullName.value},\nWe've  received your message and we'll be in touch in the following days. `;
      } else {
        contactUsData.title = 'Oh oh!';
        contactUsData.subTitle = `The message couldn't be sent,\nPlease try again later.`;
      }
      setContactUsData({ ...contactUsData });
    }
  };

  return (
    <div
      className="contact-us zigzag-content"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <Row className="contact-us-container">
        <h1
          className="contact-us-title"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          {contactUsData.title}
        </h1>
        <h4
          className="contact-us-subtitle"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          {contactUsData.subTitle}
        </h4>
        <Row data-aos="zoom-in" data-aos-duration="1500">
          {!contactUsData.messageSent &&
            contactUsFormDetails().map((formSection, idx) => (
              <div key={idx.toString()}>
                <FormInput {...formSection} onChange={handleChange} />
                {contactUsData.data[formSection.name].error && (
                  <p className="alerts">
                    {contactUsData.data[formSection.name].error}
                  </p>
                )}
              </div>
            ))}
          {!contactUsData.messageSent && (
            <Button className="contact-us-button" onClick={handleClick}>
              Send Message
            </Button>
          )}
        </Row>
      </Row>
    </div>
  );
}

export default ContactUs;
