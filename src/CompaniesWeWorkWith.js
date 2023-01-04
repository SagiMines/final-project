import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/CompaniesWeWorkWith.css';
import { companiesLogosLinks } from './data/data';

function CompaniesWeWorkWith() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="companies-logos-slider-container">
      <h1 data-aos="zoom-in" data-aos-duration="2000">
        Who We Work With
      </h1>
      <div data-aos="fade-up" data-aos-duration="2000">
        <Slider {...settings}>
          {companiesLogosLinks().map((logoLink, idx) => (
            <div key={idx.toString()}>
              <img referrerPolicy="no-referrer" src={logoLink} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CompaniesWeWorkWith;
