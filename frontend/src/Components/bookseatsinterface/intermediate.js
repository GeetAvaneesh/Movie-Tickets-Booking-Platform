import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from "react-router-dom";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import Axios from "axios";

const MovieDetails = () => {
  const [textColor, setTextColor] = useState("text-light");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to calculate luminance
    const calculateLuminance = (r, g, b) => {
      return 0.299 * r + 0.587 * g + 0.114 * b;
    };

    // Load background image and calculate luminance
    const backgroundImage = new Image();
    backgroundImage.src = "/background-image.jpg";
    backgroundImage.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = backgroundImage.width;
      canvas.height = backgroundImage.height;
      ctx.drawImage(backgroundImage, 0, 0);

      // Sample middle pixel instead of corner
      const midX = Math.floor(backgroundImage.width / 2);
      const midY = Math.floor(backgroundImage.height / 2);
      const [r, g, b] = ctx.getImageData(midX, midY, 1, 1).data;

      const luminance = calculateLuminance(r / 255, g / 255, b / 255);
      setTextColor(luminance > 0.5 ? "text-dark" : "text-light");
    };

    // Fetch movie details
    Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/movies/get-details/${id}`
    )
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        } else {
          throw new Error("Failed to fetch movie details");
        }
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const bookTickets = () => {
    if (localStorage.getItem("islogged") === "true") {
      navigate(`/booktickets/${id}`);
    } else {
      navigate("/auth");
    }
  };

  const getGenres = (genre) => {
    return genre ? genre.split(/\s+/) : [];
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-white">
        <h4>Movie details not available</h4>
      </div>
    );
  }

  return (
    <div
      className={`movie-details-page ${textColor}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data?.banner || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="mt-4">
        <Row>
          {/* Left column: Movie poster */}
          <Col md={3}>
            <Card
              className="movie-poster-card border-0"
              style={{ background: "rgba(255,255,255,0)" }}
            >
              {/* IMDb Rating */}
              <div
                className="imdb-rating px-1"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  zIndex: "1",
                  color: "#F5C518",
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: "5px",
                  padding: "2px 6px",
                }}
              >
                <FontAwesomeIcon
                  icon={faImdb}
                  style={{ fontSize: "32px", marginRight: "6px" }}
                />
                <span>{data.rating}</span>
              </div>

              <Card.Img
                variant="top"
                src={data.image}
                alt={`${data.name} Poster`}
                className="img-fluid"
              />

              <Card.Body style={{ background: "transparent" }}>
                <Card.Title className={`text-center ${textColor}`}>
                  {data.name}
                </Card.Title>
                <div className="container d-flex justify-content-center">
                  <Button variant="primary" className="mt-3" onClick={bookTickets}>
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right column: Details + trailer */}
          <Col md={9}>
            <Card
              className="movie-details-card border-0"
              style={{ background: "rgba(255,255,255,0)", borderRadius: "8px" }}
            >
              <Card.Body>
                <Card.Title className="text-white">About the Movie</Card.Title>
                <Card.Text className="text-white">{data.summary}</Card.Text>
                <div>
                  {getGenres(data.genre).map((genre, index) => (
                    <Badge key={index} pill bg="warning" text="dark" className="m-1">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <br />

            {/* Trailer Video */}
            <div
              style={{
                width: "80%",
                position: "relative",
                paddingTop: "45%",
                margin: "20px auto",
              }}
            >
              <ReactPlayer
                url={data.trailer}
                controls
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;
