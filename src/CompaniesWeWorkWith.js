import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/CompaniesWeWorkWith.css';
import { companiesLogosNames } from './data/data';

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
      <h1>Who We Work With</h1>
      <Slider {...settings}>
        {companiesLogosNames().map((companyName, idx) => (
          <div key={idx.toString()}>
            <img src={`./companies-logos/${companyName}.png`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CompaniesWeWorkWith;
