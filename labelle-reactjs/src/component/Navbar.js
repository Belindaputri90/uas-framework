import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Home from "../page/Home";
import Register from "./Register";
import "../css/styles.css";

const logout = async () => {
  const token = sessionStorage.getItem("access_token");
  let result = await fetch("http://127.0.0.1:8000/api/logout", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      sessionStorage.removeItem("access_token");
      window.location.href = "/";
    });
};
const navbar = () => {
  return (
    <Navbar className="navigation fixed-top text-dark" expand="lg">
      <Container>
        <Navbar.Brand className="Brand">
          <h2>La Belle Blanc</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            {/* <Nav.Link href="/register">Register</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
        <Nav className="justify-content-end">
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default navbar;
