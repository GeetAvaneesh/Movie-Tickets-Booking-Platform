import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Cards = () => {
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
        alert("Unable to fetch movies. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle navigation
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
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container>
      <Row xs={2} sm={2} md={3} lg={6} className="g-4">
        {movies.map((movie) => (
          <Col key={movie._id}>
            <Card
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: "50", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={movie.image}
                  alt={`${movie.name} Poster`}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
              <Card.Body>
                <Card.Text>{movie.name}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => getMovieDetails(movie._id)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;
