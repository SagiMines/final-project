import { Col, Container, Row } from 'react-bootstrap';
import './styles/WhoAreWe.css';
import aos from 'aos';

function WhoAreWe() {
  aos.init();
  return (
    <>
      <div
        className="who-are-we zigzag-content"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <div className="who-are-we-container">
          <h1
            className="who-are-we-title"
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            About Us
          </h1>
          <div
            className="who-are-we-text"
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <p>
              "Work Shop" was founded by Sagi Mines in 2022 as a small tool
              shop. The business was named "Work Shop" because it was designed
              to fulfill the needs of all the laborers. Our core values are
              simple, offer customers the highest quality products at
              competitive prices, backed by superior professional service and
              support.
            </p>
            <p>
              Although "Work Shop" is a fairly young business, our ambitions and
              love for the work tools genre are quite high. We at "Work Shop"
              see our customers as the highest priority, therefore, the quality
              of the products and service that we provide are top-notch. "Work
              Shop" serves the contractor, woodworker and do-it-yourselfer with
              a wide selection of tools and equipment from all the major
              manufacturers. We hope that in the very near future we would
              expand our business and open store locations all over Israel, In
              the meantime your more than welcome to enjoy our great online tool
              store in e-commerce.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhoAreWe;
