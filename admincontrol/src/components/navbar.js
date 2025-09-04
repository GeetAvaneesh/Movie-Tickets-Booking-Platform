import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useState } from "react";
function NavbarAdmin() {
  const handleLogout = () => {
    localStorage.setItem("isAdmin", "false");
    window.location.href = "/";
  };
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">ReelRuckus</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  ReelRuckus
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {localStorage.getItem("isAdmin") === "true" ? (
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link to="/users" className="nav-link me-3">
                      Users
                    </Link>
                    <NavDropdown
                      className="me-3"
                      title="Manage Movies"
                      id={`offcanvasNavbarDropdown1-expand-${expand}`}
                    >
                      <Link to="/add-movie-form" className="nav-link">
                        Add Movie
                      </Link>
                      <NavDropdown.Divider />
                      <Link to="/view-movie-list" className="nav-link">
                        View Movies
                      </Link>
                    </NavDropdown>
                    <NavDropdown
                      className="me-3"
                      title="Manage Theaters"
                      id={`offcanvasNavbarDropdown2-expand-${expand}`}
                    >
                      <Link to="/add-theater-form" className="nav-link">
                        Add Theater
                      </Link>
                      <NavDropdown.Divider />
                      <Link to="/view-theater-list" className="nav-link">
                        View Theaters
                      </Link>
                    </NavDropdown>
                    <Link to="/view-feedback-list" className="nav-link me-3">
                      Feedbacks
                    </Link>
                    <Link to="/show-status" className="nav-link me-3">
                      Show Status
                    </Link>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Log out
                    </button>
                  </Nav>
                ) : (
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link to="/signin" className="nav-link me-3">
                      Admin SignIn
                    </Link>
                  </Nav>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarAdmin;
