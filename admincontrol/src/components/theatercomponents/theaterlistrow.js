import Axios from "axios";
import { Link } from "react-router-dom";

function Theaterlistrow(props) {
  const { _id, name, city, movie } = props.obj;

  const handleClick = () => {
    Axios.delete(
      "https://movie-ticket-booking-pzhg.onrender.com/theatres/delete-theatre/" +
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
      <td>{city}</td>
      <td>{movie}</td>
      <td class="d-gridjustify-content-center align-items-center my-auto">
        <Link
          class="text-decoration-none text-light me-4"
          to={"/edit-theater/" + _id}
        >
          <button class="btn btn-success">Edit</button>
        </Link>
        <button onClick={handleClick} class="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
}
export default Theaterlistrow;
