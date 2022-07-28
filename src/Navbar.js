import { useState } from 'react';
import NavSlider from './NavSlider';
import { navSlidersData } from './data/data';
import './Navbar.css';

function Navbar() {
  const [sliders, setSliders] = useState(navSlidersData());

  return (
    <nav className="navbar fixed-top navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="icons/workshop-logo.png" alt=""></img>
        </a>
        <div className="collapse-hamburger-container">
          <i
            onMouseEnter={() => {
              sliders.hamburger.collapseState = true;
              setSliders({ ...sliders });
            }}
            onMouseLeave={() => {
              sliders.hamburger.collapseState = false;
              setSliders({ ...sliders });
            }}
            className="navbar-toggler navbar-toggler-icon fa fa-solid fa-bars"
          ></i>
          {sliders.hamburger.collapseState && (
            <NavSlider
              isCategories={sliders.categories.collapseState}
              onMouseEnter={() => {
                sliders.hamburger.collapseState = true;
                setSliders({ ...sliders });
              }}
              showCategories={() => {
                sliders.categories.collapseState = true;
                setSliders({ ...sliders });
              }}
              onMouseLeave={() => {
                sliders.hamburger.collapseState = false;
                setSliders({ ...sliders });
              }}
              removeCategories={() => {
                sliders.categories.collapseState = false;
                setSliders({ ...sliders });
              }}
              name={sliders.hamburger.collapseName}
              categoryName={sliders.categories.collapseName}
              categoriesSections={sliders.categories.sections}
              sections={sliders.hamburger.sections}
            />
          )}
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <section className="icons-search">
            <input
              className="search-bar"
              type="text"
              placeholder="Search a tool"
            ></input>
            <i className="fa fa-solid fa-heart"></i>
            <i className="fa fa-shopping-cart"></i>
            <div className="user-container">
              <i
                onMouseEnter={() => {
                  sliders.user.state = true;
                  setSliders({ ...sliders });
                }}
                onMouseLeave={() => {
                  sliders.user.state = false;
                  setSliders({ ...sliders });
                }}
                className="fa fa-user"
              ></i>

              {sliders.user.state && (
                <NavSlider
                  onMouseEnter={() => {
                    sliders.user.state = true;
                    setSliders({ ...sliders });
                  }}
                  onMouseLeave={() => {
                    sliders.user.state = false;
                    setSliders({ ...sliders });
                  }}
                  name={sliders.user.name}
                  sections={sliders.user.sections}
                />
              )}
            </div>

            <div className="hamburger-container">
              <i
                onMouseEnter={() => {
                  sliders.hamburger.state = true;
                  setSliders({ ...sliders });
                }}
                onMouseLeave={() => {
                  sliders.hamburger.state = false;
                  setSliders({ ...sliders });
                }}
                className="fa fa-solid fa-bars"
              ></i>
              {sliders.hamburger.state && (
                <NavSlider
                  isCategories={sliders.categories.state}
                  onMouseEnter={() => {
                    sliders.hamburger.state = true;
                    setSliders({ ...sliders });
                  }}
                  showCategories={() => {
                    sliders.categories.state = true;
                    setSliders({ ...sliders });
                  }}
                  onMouseLeave={() => {
                    sliders.hamburger.state = false;
                    setSliders({ ...sliders });
                  }}
                  removeCategories={() => {
                    sliders.categories.state = false;
                    setSliders({ ...sliders });
                  }}
                  name={sliders.hamburger.name}
                  categoryName={sliders.categories.name}
                  categoriesSections={sliders.categories.sections}
                  sections={sliders.hamburger.sections}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
