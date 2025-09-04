import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./style.css";

function OffcanvasExample() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_BASE_URL;

  const [query, setQuery] = useState("");
  const [nameResults, setNameResults] = useState([]);
  const [genreResults, setGenreResults] = useState([]);

  const isDark = localStorage.getItem("darkmode") === "yes";
  const isLogged = localStorage.getItem("islogged") === "true";
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("id");

  const handleLogout = () => {
    localStorage.setItem("islogged", "false");
    navigate("/");
  };

  const getColor = () => (isDark ? "text-light" : "text-dark");
  const getIconBg = () => (isDark ? "bg-light text-dark" : "bg-dark text-light");
  const getThemeClass = () => (isDark ? "light-icon" : "dark-icon");

  const getLogo = () =>
    "https://github.com/Rahul21sai/movie_forntend/assets/110412514/f5fba0cb-aaf3-4181-aa7f-e36273b744e5";

  const goProfile = () => {
    if (userId) navigate(`/profile/${userId}`);
  };

  const genres = [
    "Action",
    "Animation",
    "Adventure",
    "Family",
    "Comedy",
    "Drama",
    "Romance",
    "Crime",
    "Thriller",
    "Sci-Fi",
  ];

  const searchByName = async () => {
    if (!query.trim()) {
      setNameResults([]);
      return;
    }
    try {
      const res = await axios.get(`${API}/movies/searchbyname/${encodeURIComponent(query)}`);
      if (res.status === 200) setNameResults(res.data);
    } catch (e) {
      console.error("Search by name failed:", e);
    }
  };

  const searchByGenre = async (genre) => {
    try {
      const res = await axios.get(`${API}/movies/searchbygenre/${encodeURIComponent(genre)}`);
      if (res.status === 200) setGenreResults(res.data);
    } catch (e) {
      console.error("Search by genre failed:", e);
    }
  };

  const goMovieDetails = (id) => {
    if (isLogged) {
      navigate(`/moviedetails/${id}`);
    } else {
      navigate("/auth");
    }
  };

  const toggleTheme = () => {
    localStorage.setItem("darkmode", isDark ? "no" : "yes");
    // full reload to apply global theme quickly
    window.location.reload();
  };

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} variant="tabs">
          <Container fluid>
            <Navbar.Brand className={getColor()}>
              <img height="50" alt="Logo" src={getLogo()} />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton className={getThemeClass()}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img height="36" src={getLogo()} alt="RR" />
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Search by name */}
                  <Form className="d-flex mx-5" onSubmit={(e) => e.preventDefault()}>
                    <Form.Control
                      type="search"
                      placeholder="Search movies"
                      aria-label="Search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </Form>

                  <DropdownButton
                    as={ButtonGroup}
                    id="search-by-name"
                    variant="success"
                    title="Search"
                    onClick={searchByName}
                    drop="down-centered"
                  >
                    {nameResults.length === 0 && (
                      <Dropdown.Item disabled>No results</Dropdown.Item>
                    )}
                    {nameResults.map((m) => (
                      <div key={m._id}>
                        <Dropdown.Item onClick={() => goMovieDetails(m._id)}>
                          <span>
                            <img
                              src={m.image}
                              alt={`${m.name} Poster`}
                              style={{ width: 40, marginRight: 10 }}
                            />
                          </span>
                          {m.name}
                        </Dropdown.Item>
                        <Dropdown.Divider />
                      </div>
                    ))}
                  </DropdownButton>

                  {/* Search by genre */}
                  <DropdownButton
                    as={ButtonGroup}
                    id="search-by-genre"
                    variant="primary"
                    title="Search by Genre"
                    drop="down-centered"
                    className="mx-3"
                  >
                    {genres.map((g) => (
                      <NavDropdown
                        title={g}
                        id={`genre-${g}`}
                        key={g}
                        drop="start"
                        onClick={() => searchByGenre(g)}
                      >
                        {genreResults.length === 0 && (
                          <Dropdown.Item disabled>No results</Dropdown.Item>
                        )}
                        {genreResults.map((rec) => (
                          <div key={rec._id}>
                            <Dropdown.Item onClick={() => goMovieDetails(rec._id)}>
                              <span>
                                <img
                                  src={rec.image}
                                  alt={`${rec.name} Poster`}
                                  style={{ width: 40, marginRight: 10 }}
                                />
                              </span>
                              {rec.name}
                            </Dropdown.Item>
                            <Dropdown.Divider />
                          </div>
                        ))}
                      </NavDropdown>
                    ))}
                  </DropdownButton>

                  {/* Theme toggle */}
                  <Nav.Link onClick={toggleTheme}>
                    <FontAwesomeIcon
                      icon={faCircleHalfStroke}
                      className={getIconBg()}
                      style={{ height: 20, borderRadius: 10 }}
                    />
                  </Nav.Link>

                  {/* Auth / Profile */}
                  {!isLogged ? (
                    <Link to="/auth">
                      <button className="btn btn-primary">Sign In / Register</button>
                    </Link>
                  ) : (
                    <>
                      <div
                        className="d-flex align-items-center px-3"
                        onClick={goProfile}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          className={getColor()}
                          style={{ fontSize: 20, marginRight: 8 }}
                        />
                        <p className={`text-center mb-0 ${getColor()}`}>{username}</p>
                      </div>
                      <Button className={`btn btn-warning ${getColor()}`} onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
