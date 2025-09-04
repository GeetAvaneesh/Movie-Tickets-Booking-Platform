import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Carousel.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Carousell = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch movies
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_BASE_URL}/movies`)
      .then((res) => {
        if (res.status === 200) {
          setMovies(res.data);
        } else {
          throw new Error("Failed to fetch movies");
        }
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        alert("Unable to load movies. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Navigate to details or auth
  const getMovieDetails = (id) => {
    if (localStorage.getItem("islogged") === "true") {
      navigate(`/moviedetails/${id}`);
    } else {
      navigate("/auth");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center text-white py-5">
        <h4>No movies available</h4>
      </div>
    );
  }

  return (
    <Carousel>
      {movies.slice(0, 6).map((movie, index) => (
        <Carousel.Item key={movie._id} interval={3000}>
          <img
            src={movie.banner}
            alt={`${movie.name} Banner`}
            className="carousel-item img-fluid d-block w-100"
          />
          <Carousel.Caption>
            <button
              className="btn btn-primary"
              onClick={() => getMovieDetails(movie._id)}
            >
              Book Now
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Carousell;
