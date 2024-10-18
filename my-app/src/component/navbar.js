import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

let NavbarComponent = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#predict">
            <img
              src="images/logo2.png"
              width="40"
              height="30"
              className="d-inline-block align-top ml-0"
              alt="Logo"
            />{" "}
            Dog Breed Prediction System
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#predict">Predict</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contactUs">Contact Us</Nav.Link>

            {/* <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/predict">Predict</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/contactUs">Contact Us</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;