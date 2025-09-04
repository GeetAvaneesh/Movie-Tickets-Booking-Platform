import Axios from "axios";
import { useEffect, useState } from "react";
import Movielistrow from "./movielistrow";

function MovieList() {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    Axios.get("https://movie-ticket-booking-pzhg.onrender.com/movies")
      .then((res) => {
        if (res.status === 200) setArr(res.data);
        else Promise.reject();
      })
      .catch((err) => alert(err));
  }, []);

  const ListItems = () => {
    return arr.map((val, ind) => {
      return <Movielistrow obj={val} />;
    });
  };
  return (
    <table
      style={{ maxWidth: "60%", margin: "50px auto" }}
      class="table table-bordered table-striped table-dark"
    >
      <thead>
        <tr>
          <th class="text-center col-md-2">Name</th>
          <th class="text-center col-md-2">Length</th>
          <th class="text-center col-md-2">Genre</th>
          <th class="text-center col-md-2">Image</th>
          <th class="text-center col-md-2">Banner</th>
          <th class="text-center col-md-2">Rating</th>
          <th className="text-center col-md-2">Actions</th>
        </tr>
      </thead>
      <tbody>{ListItems()}</tbody>
    </table>
  );
}
export default MovieList;
