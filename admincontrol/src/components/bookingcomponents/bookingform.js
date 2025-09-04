import { useEffect, useState } from "react";
import SeatBooking from "./booking_interface/main";
function BookingForm(props) {
  const [date, setDate] = useState(props.dateValue);
  const [city, setCity] = useState(props.cityValue);
  const [theatre, setTheatre] = useState(props.theatreValue);
  const [seats, setSeats] = useState(props.seatsValue);

  useEffect(() => {
    setDate(props.dateValue);
    setCity(props.cityValue);
    setTheatre(props.theatreValue);
    setSeats(props.seatsValue);
  }, [props.dateValue, props.cityValue, props.theatreValue, props.seatsValue]);

  const arr = [date, city, theatre, seats];

  const handleClick = () => {
    props.getState(arr);
  };

  const getVal = (childData) => {
    setSeats(childData);
  };

  return (
    <div style={{ margin: "0px auto" }}>
      <input
        type="date"
        defaultValue={props.dateValue}
        onChange={(event) => setDate(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie date"
      />
      <input
        defaultValue={props.cityValue}
        onChange={(event) => setCity(event.target.value)}
        class="form-control my-3"
        placeholder="Enter movie city"
      />
      <input
        defaultValue={props.theatreValue}
        onChange={(event) => setTheatre(event.target.value)}
        class="form-control my-3"
        placeholder="Enter theatre"
      />
      <SeatBooking getVal={getVal} />
      <button
        onClick={handleClick}
        class="btn btn-success my-3 d-block mx-auto"
        type="submit"
      >
        conifrm
      </button>
    </div>
  );
}

export default BookingForm;
