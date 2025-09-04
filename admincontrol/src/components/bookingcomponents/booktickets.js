import { useEffect, useState } from "react";
import Axios from "axios";
import SeatBooking from "./booking_interface/main";

function BookTickets() {
  const [city, setcity] = useState([]);
  const [theatername, settheatername] = useState("");
  const [showdate, setdate] = useState([]);
  const [time, settime] = useState([]);
  const [locations, setlocation] = useState([]);
  const [theatres, settheatres] = useState([]);
  const [showtheaters, setshowtheathers] = useState(false);
  const [dates, setdates] = useState([]);
  const [showsubmitbutton, setshowsubmitbutton] = useState(true);
  const [showdetails, setshowdetails] = useState([]);
  // const getState = (childData) => {
  //     setArr(childData);
  // }

  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = {date: arr[0],city:arr[1],theatre:arr[2],seats:arr[4]};
  //     console.log(data)
  // }
  useEffect(() => {
    const today = new Date();
    today.setHours(6, 0, 0, 0);

    const options = [];

    for (let i = 0; i < 4; i++) {
      const date = new Date(today); // Create a new date object to avoid modifying the original
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];
      options.push({ date, formattedDate });
    }
    setdates(options);
    Axios.get(
      "https://movie-ticket-booking-pzhg.onrender.com/theatres/get-cities"
    )
      .then((res) => {
        if (res.status === 200) {
          setlocation(res.data);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const getLocation = () => {
    return locations.map((val) => {
      return <option value={val}>{val}</option>;
    });
  };
  const gettheatres = (event) => {
    setcity(event.target.value);
    Axios.get(
      "https://movie-ticket-booking-pzhg.onrender.com/theatres/get-theaters/" +
        event.target.value
    )
      .then((res) => {
        if (res.status === 200) {
          setshowtheathers(true);
          settheatres(res.data);
        } else Promise.reject();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const gettheaternames = () => {
    return theatres.map((val) => {
      return <option>{val.name}</option>;
    });
  };
  const getDates = () => {
    return dates.map((dateobj) => {
      return <option value={dateobj.date}>{dateobj.formattedDate}</option>;
    });
  };
  const getshowdetails = (event) => {
    event.preventDefault();
    console.log(localStorage.getItem("movie"));
    Axios.post(
      "https://movie-ticket-booking-pzhg.onrender.com/shows/createshow",
      {
        showName: localStorage.getItem("movie"),
        time: time,
        date: showdate,
        location: city,
        theater: theatername,
      }
    ).then((res) => {
      if (res.status === 200) {
        setshowdetails(res.data);
        setshowsubmitbutton(false);
      }
    });
  };
  return (
    <form>
      <select
        className="form-select my-3"
        defaultValue={locations[0]}
        onChange={gettheatres}
      >
        {getLocation()}
      </select>
      {showtheaters && (
        <>
          <select
            className="form-select my-3"
            defaultValue={theatres.length > 0 ? theatres[0].name : ""}
            onChange={(event) => {
              settheatername(event.target.value);
            }}
          >
            {gettheaternames()}
          </select>
          <select
            className="form-select my-3"
            defaultValue={dates.length > 0 ? dates[0].date : ""}
            onChange={(event) => {
              setdate(event.target.value);
            }}
          >
            {getDates()}
          </select>
          <select
            className="form-select my-3"
            onChange={(event) => {
              settime(event.target.value);
            }}
            defaultValue={"11:15 AM"}
          >
            <option value={"11:15 AM"}>11:15 AM</option>
            <option value={"2:30 PM"}>2:30 PM</option>
            <option value={"5:30 PM"}>5:30 PM</option>
            <option value={"11:00 PM"}>11:00 PM</option>
          </select>
          {showsubmitbutton && (
            <button onClick={getshowdetails} className="btn btn-primary">
              submit
            </button>
          )}
        </>
      )}
      {!showsubmitbutton && <SeatBooking obj={showdetails} />}
    </form>
  );
}
export default BookTickets;
