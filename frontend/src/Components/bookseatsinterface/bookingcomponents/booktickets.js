import { useEffect, useState } from "react";
import Axios from "axios";
import SeatBooking from "./booking_interface/main";
import Loader from "../../auth/utils/loader";
import "../styles/styles.css";

function BookTickets() {
  const [city, setCity] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [showDate, setShowDate] = useState("");
  const [time, setTime] = useState("");
  const [locations, setLocations] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [dates, setDates] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [showTheatres, setShowTheatres] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date();
    today.setHours(6, 0, 0, 0);

    const options = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];
      options.push(formattedDate); // ✅ store as string only
    }
    setDates(options);

    Axios.get(`${process.env.REACT_APP_API_BASE_URL}/theatres/get-cities`)
      .then((res) => {
        if (res.status === 200) {
          setLocations(res.data);
        }
      })
      .catch((err) => alert(err));
  }, []);

  const getTheatres = (selectedCity) => {
    Axios.get(`${process.env.REACT_APP_API_BASE_URL}/theatres/get-theaters/${selectedCity}`)
      .then((res) => {
        if (res.status === 200) {
          setTheatres(res.data);
          setShowTheatres(true);
        }
      })
      .catch((err) => alert(err));
  };

  const handleSubmit = () => {
    setLoading(true);
    Axios.post(`${process.env.REACT_APP_API_BASE_URL}/shows/createshow`, {
      showName: localStorage.getItem("movie"),
      time,
      date: showDate,
      location: city,
      theater: theaterName,
    })
      .then((res) => {
        if (res.status === 200) {
          setShowDetails(res.data);
        }
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  const timeSlots = ["11:15 AM", "2:30 PM", "5:30 PM", "11:00 PM"];

  return (
    <div>
      {/* City Selection */}
      <div className="card-container d-flex">
        {locations.map((location, index) => (
          <div
            key={index}
            className={`card ${city === location ? "bg-warning btn mx-3" : "btn mx-3"}`}
            onClick={() => {
              setCity(location);
              getTheatres(location);
            }}
          >
            {location}
          </div>
        ))}
      </div>

      {/* Theater Selection */}
      {showTheatres && (
        <div className="card-container d-flex">
          {theatres.map((theater, index) => (
            <div
              key={index}
              className={`card ${theaterName === theater.name ? "bg-warning btn mx-3" : "btn mx-3"}`}
              onClick={() => setTheaterName(theater.name)}
            >
              {theater.name}
            </div>
          ))}
        </div>
      )}

      {/* Date Selection */}
      {showTheatres && (
        <div className="card-container d-flex">
          {dates.map((dateStr, index) => (
            <div
              key={index}
              className={`card ${showDate === dateStr ? "bg-warning btn mx-3" : "btn mx-3"}`}
              onClick={() => setShowDate(dateStr)}
            >
              {dateStr}
            </div>
          ))}
        </div>
      )}

      {/* Time Selection */}
      {showTheatres && (
        <div className="card-container d-flex">
          {timeSlots.map((timeSlot, index) => (
            <div
              key={index}
              className={`card ${time === timeSlot ? "bg-warning btn mx-3" : "btn mx-3"}`}
              onClick={() => setTime(timeSlot)}
            >
              {timeSlot}
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {!showDetails && (
        <button
          onClick={handleSubmit}
          className="btn btn-primary mt-3"
          disabled={!city || !theaterName || !showDate || !time || loading}
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      )}

      {/* Seat Booking */}
      {showDetails && <SeatBooking obj={showDetails} />}
    </div>
  );
}

export default BookTickets;
