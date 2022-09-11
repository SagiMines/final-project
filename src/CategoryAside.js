import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/CategoryAside.css';

function CategoryAside() {
  return (
    <aside className="category-aside">
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky"></div>
        <Nav.Item className="heading">
          <Nav.Link disabled>Categories</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <img src="https://img.icons8.com/external-nawicon-glyph-nawicon/20/undefined/external-drill-construction-nawicon-glyph-nawicon.png" />
            <Link className="category-link" to="/categories/1">
              Drills
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <img src="https://img.icons8.com/ios-filled/20/undefined/drill.png" />
            <Link className="category-link" to="/categories/2">
              Impact Drivers
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABdElEQVQ4jdWTP0vDQBjGf5c2RR1K7eRBSqyoSJEiEqoBnRwcSocOLn4Dv4afwt1dXErdxKngIFJQF2k6dIwSRKmmlDoktbEm1dpFf9Pde889PO/9gb+O+IEmBawC2UDtHrgG2qMM48AysG4Yxn6hUFip1Wrper1Ot9tNDml7wBPw4M93gCaAEhCtmaZ5CRy7rrstpcxKKeO+RmQyGXRdR9O0YJAFYB7IBVMNekulYgBCCBRFQYhBqHw+j5SSRqNBq9UCiAXSfmqzz021Wi0DW0KIXcdxFm3bjvV6nr5SqQwf1wzwCHQBq1+MupQYkASmgFlgyR8fAQnf7AIoAy7wEuEzkhxwBzh4bZ6GiZSwYgS3QDOdTidUVW0D2qSGAHvFYrGpadobMIf3RicyfLZtu26aZgKQwOakhliWdVYqlaYVRWkDG+PuD+NAVVUHeAUOhxfjX/XfYnQ6HRfvH19NGO6Dc+AkbGHsM/T59WOOQse75X/IO5ofVzhK2chCAAAAAElFTkSuQmCC"></img>
            Heat Guns
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">
            <img src="https://img.icons8.com/ios-filled/20/undefined/circular-saw--v1.png" />
            Saws
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">
            <img src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/20/undefined/external-kit-uxui-icongeek26-glyph-icongeek26.png" />
            Good-To-Have Kits
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">
            <img src="https://img.icons8.com/ios-filled/20/undefined/car-battery.png" />
            Batteries
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">
            <img src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/20/undefined/external-screws-carpentry-icongeek26-glyph-icongeek26.png" />
            Screws & Anchors
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </aside>
  );
}

export default CategoryAside;
