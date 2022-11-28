import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/CompaniesWeWorkWith.css';

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
    // initialSlide: 0,
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
        <div>
          <img src="./companies-logos/bosch.png" />
        </div>
        <div>
          <img src="./companies-logos/bosch.png" />
        </div>
        <div>
          <img src="./companies-logos/bosch.png" />
        </div>
        <div>
          <img src="./companies-logos/bosch.png" />
        </div>
        <div>
          <img src="./companies-logos/bosch.png" />
        </div>
        <div>
          <img src="./companies-logos/bosch.png" />
        </div>
      </Slider>
    </div>
  );
}

export default CompaniesWeWorkWith;
