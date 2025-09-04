import React, { useState, useEffect } from "react";
import Axios from "axios";
import FeedbackListRow from "./feedbacklistrow";

function FeedbackList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("https://movie-ticket-booking-pzhg.onrender.com/feedbacks")
      .then((res) => {
        if (res.status === 200) setData(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const ListItems = () => {
    data.reverse();
    return data.map((val, ind) => {
      return <FeedbackListRow key={ind} obj={val} />;
    });
  };

  return (
    <div>
      <table
        style={{ maxWidth: "70%", margin: "50px auto" }}
        className="table table-bordered table-striped table-dark"
      >
        <thead>
          <tr>
            <th className="text-center col-md-2">User Name</th>
            <th className="text-center col-md-2">Feedback</th>
            <th className="text-center col-md-2">Time</th>
          </tr>
        </thead>
        <tbody>{ListItems()}</tbody>
      </table>
    </div>
  );
}

export default FeedbackList;
