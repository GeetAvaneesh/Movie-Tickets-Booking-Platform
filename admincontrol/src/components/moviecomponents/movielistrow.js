import Axios from "axios";
import { Link } from "react-router-dom";

function Movielistrow(props) {
  const { _id, name, length, genre, image, banner, rating } = props.obj;

  const handleClick = () => {
    Axios.delete(
      "https://movie-ticket-booking-pzhg.onrender.com/movies/delete-movie/" +
        _id
    )
      .then((res) => {
        if (res.status === 200) {
          alert("Record deleted successfully");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => alert(err));
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{length}</td>
      <td>{genre}</td>
      <td>
        <img src={image} alt={name} height="90px" />
      </td>
      <td>
        <img src={banner} alt={name} height="90px" />
      </td>
      <td>{rating}</td>
      <td>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Link
            class="text-decoration-none text-light mx-2"
            to={"/edit-movie/" + _id}
          >
            <button class="btn btn-success">Edit</button>
          </Link>
          <button onClick={handleClick} class="btn btn-danger mx-2">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
export default Movielistrow;
