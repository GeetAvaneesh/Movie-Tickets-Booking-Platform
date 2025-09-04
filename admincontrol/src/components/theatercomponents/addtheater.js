import { useState } from "react";
import Theaterform from "./theaterform";
import Axios from "axios";

function AddTheater() {
  const [arr, setArr] = useState([]);
  const getChild = (arr) => {
    setArr(arr);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name: arr[0], city: arr[1], movie: arr[2] };
    console.log(data);
    Axios.post(
      "https://movie-ticket-booking-pzhg.onrender.com/theatres/add-theatre/",
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
      <Theaterform getChild={getChild}>Add Theater</Theaterform>
    </form>
  );
}

export default AddTheater;
