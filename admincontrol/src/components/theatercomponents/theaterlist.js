import Axios from "axios";
import { useEffect, useState } from "react";
import Theaterlistrow from "./theaterlistrow";

function Theaterlist() {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    Axios.get("https://movie-ticket-booking-pzhg.onrender.com/theatres")
      .then((res) => {
        if (res.status === 200) setArr(res.data);
        else Promise.reject();
      })
      .catch((err) => alert(err));
  }, []);

  const ListItems = () => {
    return arr.map((val, ind) => {
      return <Theaterlistrow obj={val} />;
    });
  };
  return (
    <table
      style={{ maxWidth: "60%", margin: "50px auto" }}
      class="table table-bordered table-striped table-dark"
    >
      <thead>
        <tr>
          <th class="text-center">Name</th>
          <th class="text-center">Location</th>
          <th class="text-center">Movie</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>{ListItems()}</tbody>
    </table>
  );
}
export default Theaterlist;
