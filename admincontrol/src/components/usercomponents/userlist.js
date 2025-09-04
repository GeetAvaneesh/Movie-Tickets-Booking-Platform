import Axios from "axios";
import { useEffect, useState } from "react";
import Userlistrow from "./userlistrow";

function UserList() {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    Axios.get("https://movie-ticket-booking-pzhg.onrender.com/users")
      .then((res) => {
        if (res.status === 200) setArr(res.data);
        else Promise.reject();
      })
      .catch((err) => alert(err));
  }, []);

  const ListItems = () => {
    return arr.map((val, ind) => {
      return <Userlistrow obj={val} />;
    });
  };
  return (
    <table
      style={{ margin: "50px auto" }}
      class="table table-bordered table-striped table-dark"
    >
      <thead>
        <tr>
          <th class="text-center">Name</th>
          <th class="text-center">Email</th>
          <th class="text-center">Password</th>
          <th class="text-center">Mobile</th>
          <th class="text-center">DOB</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>{ListItems()}</tbody>
    </table>
  );
}
export default UserList;
