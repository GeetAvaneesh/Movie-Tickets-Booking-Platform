import Axios from "axios";

function Userlistrow(props) {
  const { _id, name, email, password, mobile, dob } = props.obj;

  const handleClick = () => {
    Axios.delete(
      "https://movie-ticket-booking-pzhg.onrender.com/users/deleteAccount/" +
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
      <td className="text-center">{name}</td>
      <td className="text-center">{email}</td>
      <td className="text-center">{password}</td>
      <td className="text-center">{mobile}</td>
      <td className="text-center">{dob}</td>
      <td class="text-center my-auto">
        <button onClick={handleClick} class="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
}
export default Userlistrow;
