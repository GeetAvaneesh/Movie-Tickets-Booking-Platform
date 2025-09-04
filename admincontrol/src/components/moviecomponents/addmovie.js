import { useState } from "react";
import MovieForm from "./movieForm";
import Axios from "axios";

function AddMovie() {
  const [arr, setArr] = useState([]);

  const getState = (childData) => {
    setArr(childData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: arr[0],
      length: arr[1],
      genre: arr[2],
      image: arr[3],
      banner: arr[4],
      rating: arr[5],
      summary: arr[6],
      trailer: arr[7],
    };
    Axios.post(
      "https://movie-ticket-booking-pzhg.onrender.com/movies/add-movie/",
      data
    )
      .then((res) => {
        if (res.status === 200) alert("Record added successfully");
        else Promise.reject();
      })
      .catch((err) => alert(err));
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <MovieForm
        getState={getState}
        nameValue=""
        lengthValue=""
        genreValue=""
        imageValue=""
        bannerValue=""
        ratingValue=""
        summaryValue=""
        trailerValue=""
      >
        Add Movie
      </MovieForm>
    </form>
  );
}
export default AddMovie;
