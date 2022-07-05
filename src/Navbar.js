import { MDBCol, MDBIcon } from 'mdbreact';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="icons/workshop-logo.png" alt=""></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa fa-solid fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <section className="icons-search">
            <input
              className="search-bar"
              type="text"
              placeholder="Search a tool"
            ></input>
            <i className="fa fa-solid fa-heart"></i>
            <i className="fa fa-shopping-cart"></i>
            <i className="fa fa-user" aria-hidden="true"></i>
            <i className="fa fa-solid fa-bars"></i>
          </section>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
