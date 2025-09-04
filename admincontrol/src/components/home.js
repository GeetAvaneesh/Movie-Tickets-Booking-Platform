import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
  const [isTheatersDropdownOpen, setIsTheatersDropdownOpen] = useState(false);

  const toggleMoviesDropdown = () => {
    setIsMoviesDropdownOpen(!isMoviesDropdownOpen);
  };

  const toggleTheatersDropdown = () => {
    setIsTheatersDropdownOpen(!isTheatersDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        ReelRuckus
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="nav mt-3">
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item dropdown">
            <p
              className="nav-link dropdown-toggle"
              id="moviesDropdownLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isMoviesDropdownOpen}
              onClick={toggleMoviesDropdown}
              href="/"
            >
              Manage Movies
            </p>
            <div
              className={`dropdown-menu ${isMoviesDropdownOpen ? "show" : ""}`}
              aria-labelledby="moviesDropdownLink"
            >
              <Link
                to="/add-movie-form"
                className="dropdown-item"
                onClick={toggleMoviesDropdown}
              >
                Add Movie
              </Link>
              <Link
                to="/view-movie-list"
                className="dropdown-item"
                onClick={toggleMoviesDropdown}
              >
                View Movie List
              </Link>
            </div>
          </li>

          {/* Add a similar dropdown for managing theaters */}
          <li className="nav-item dropdown">
            <p
              className="nav-link dropdown-toggle"
              id="theatersDropdownLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isTheatersDropdownOpen}
              onClick={toggleTheatersDropdown}
              href="/"
            >
              Manage Theaters
            </p>
            <div
              className={`dropdown-menu ${
                isTheatersDropdownOpen ? "show" : ""
              }`}
              aria-labelledby="theatersDropdownLink"
            >
              <Link
                to="/add-theater-form"
                className="dropdown-item"
                onClick={toggleTheatersDropdown}
              >
                Add Theater
              </Link>
              <Link
                to="/view-theater-list"
                className="dropdown-item"
                onClick={toggleTheatersDropdown}
              >
                View Theater List
              </Link>
            </div>
          </li>
          <p className="nav-item mt-2 mx-3">Admin</p>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
