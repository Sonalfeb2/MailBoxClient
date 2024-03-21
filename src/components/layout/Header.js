import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";

import { Outlet } from "react-router-dom";
import { AuthReducerAction } from "../../store/auth-reducer";
function Header() {
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar expand="lg" variant="light">
        <Container>
          <Navbar.Brand href="#home">Mail Box</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">Products</Nav.Link>
              <Nav.Link href="#about">Aboutus</Nav.Link>
              <Nav.Link
                onClick={() => {
                  dispatch(AuthReducerAction.logOutUser())
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Header;
