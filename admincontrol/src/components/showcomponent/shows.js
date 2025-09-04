import Axios from "axios";
import { useState, useEffect } from "react";
function Shows() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    Axios.get("https://movie-ticket-booking-pzhg.onrender.com/shows/alldetails")
      .then((response) => {
        setdata(response.data); // Assuming the data is directly in response.data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const ListItems = () => {
    return data.map((show) => (
      <tr key={show.showDetails.id}>
        <td>{show.showDetails.showName}</td>
        <td>{show.showDetails.location}</td>
        <td>{show.showDetails.theater}</td>
        <td>{show.showDetails.date.split("T")[0]}</td>
        <td>{show.showDetails.time}</td>
        <td>{show.seatStatus.freeSeats}</td>
        <td>{show.seatStatus.occupiedSeats}</td>
      </tr>
    ));
  };
  return (
    <>
      <table
        style={{ maxWidth: "60%", margin: "50px auto" }}
        class="table table-bordered table-striped table-dark"
      >
        <thead>
          <tr>
            <th class="text-center">Movie Name</th>
            <th class="text-center">Location</th>
            <th class="text-center">Theater</th>
            <th className="text-center">Date</th>
            <th className="text-center">Time</th>
            <th className="text-center">Free Seats</th>
            <th className="text-center">Occupied Seats</th>
          </tr>
        </thead>
        <tbody>{ListItems()}</tbody>
      </table>
    </>
  );
}
export default Shows;
