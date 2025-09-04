import { useEffect, useState } from "react";

function MovieForm(props) {
  const [name, setName] = useState(props.nameValue);
  const [length, setLength] = useState(props.lengthValue);
  const [genre, setGenre] = useState(props.genreValue);
  const [image, setImage] = useState(props.imageValue);
  const [banner, setBanner] = useState(props.bannerValue);
  const [rating, setRating] = useState(props.ratingValue);
  const [summary, setSummary] = useState(props.summaryValue);
  const [trailer, setTrailer] = useState(props.trailerValue);
  useEffect(() => {
    setName(props.nameValue);
    setLength(props.lengthValue);
    setGenre(props.genreValue);
    setImage(props.imageValue);
    setBanner(props.bannerValue);
    setRating(props.ratingValue);
    setSummary(props.summaryValue);
    setTrailer(props.trailerValue);
  }, [
    props.nameValue,
    props.lengthValue,
    props.genreValue,
    props.imageValue,
    props.bannerValue,
    props.ratingValue,
    props.summaryValue,
    props.trailerValue,
  ]);

  const arr = [name, length, genre, image, banner, rating, summary, trailer];

  const handleClick = () => {
    props.getState(arr);
  };

  return (
    <div style={{ maxWidth: "40%", margin: "0px auto" }}>
      <input
        defaultValue={props.nameValue}
        onChange={(event) => setName(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie name"
      />
      <input
        defaultValue={props.lengthValue}
        onChange={(event) => setLength(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie length"
      />
      <input
        defaultValue={props.genreValue}
        onChange={(event) => setGenre(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie genre"
      />
      <input
        defaultValue={props.imageValue}
        onChange={(event) => setImage(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie imageurl"
      />
      <input
        defaultValue={props.bannerValue}
        onChange={(event) => setBanner(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie bannerurl"
      />
      <input
        defaultValue={props.ratingValue}
        onChange={(event) => setRating(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie rating"
      />
      <textarea
        defaultValue={props.summaryValue}
        onChange={(event) => setSummary(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie Summary"
      />
      <input
        defaultValue={props.trailerValue}
        onChange={(event) => setTrailer(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie trailer url"
      />
      <button
        onClick={handleClick}
        class="btn btn-success my-3 d-block mx-auto"
        type="submit"
      >
        {props.children}
      </button>
    </div>
  );
}

export default MovieForm;
