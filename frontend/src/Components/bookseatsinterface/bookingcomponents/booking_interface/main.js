import React, { useState, useEffect } from "react";
// import Axios from "axios"; // not used
import "../../styles/styles.css";

const SeatsCheck = (props) => {
  const seatsarr = props.obj?.seats || [];
  const [amount, setAmount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [showseats, setshowseats] = useState(true);

  const handleSeatClick = (seatId, isOccupied) => {
    if (!isOccupied) {
      const updatedSelectedSeats = new Set(selectedSeats);
      if (selectedSeats.has(seatId)) {
        setAmount((prev) => prev - 200);
        updatedSelectedSeats.delete(seatId);
      } else {
        setAmount((prev) => prev + 200);
        updatedSelectedSeats.add(seatId);
      }
      setSelectedSeats(updatedSelectedSeats);
    }
  };

  const getcolor = () =>
    localStorage.getItem("darkmode") === "yes" ? "text-light" : "text-dark";

  const handleClick = () => {
    const updatedSeats = seatsarr.map((seatData) => {
      if (selectedSeats.has(seatData.seatId)) {
        seatData.isOccupied = true;
        seatData.userDetails = localStorage.getItem("id");
      }
      return seatData;
    });
    props.getSelectedSeatChildData(updatedSeats, Array.from(selectedSeats));
    setshowseats(false);
  };

  // Write selected seats to localStorage when selection changes
  useEffect(() => {
    localStorage.setItem(
      "selectedseatsnow",
      Array.from(selectedSeats).join(", ")
    );
  }, [selectedSeats]);

  const renderSeats = () => {
    if (!seatsarr) return null;

    const seatRows = [];
    const totalSeats = seatsarr.length;

    for (let i = 0; i < Math.ceil(totalSeats / 8); i++) {
      const seatRow = [];
      for (let j = 0; j < 8; j++) {
        const seatIndex = i * 8 + j;
        if (seatIndex < totalSeats) {
          const seatData = seatsarr[seatIndex];
          seatRow.push(
            <div
              key={seatIndex}
              className={`col-1 ${
                seatData.isOccupied
                  ? "btn btn-dark"
                  : selectedSeats.has(seatData.seatId)
                  ? "btn btn-success"
                  : "btn btn-light"
              }`}
              onClick={() =>
                handleSeatClick(seatData.seatId, seatData.isOccupied)
              }
              style={{ cursor: seatData.isOccupied ? "not-allowed" : "pointer" }}
            >
              {seatData.seatId}
            </div>
          );
        }
      }
      seatRows.push(
        <div key={i} className="row">
          <div className="col-2"></div>
          {seatRow}
        </div>
      );
    }
    return seatRows;
  };

  return (
    <center>
      <div className="container justify-content-center">
        <div className="col-md-8">{showseats && renderSeats()}</div>
        <p className={`mt-2 ${getcolor()}`}>
          Selected Seats: {Array.from(selectedSeats).join(", ")}
        </p>
        <p className={`${getcolor()}`}>Total Amount: ₹{amount}</p>
        {showseats && (
          <div className="btn btn-success" onClick={handleClick}>
            Confirm Tickets
          </div>
        )}
      </div>
    </center>
  );
};

const SeatBooking = (props) => {
  const prevSelected = props.obj;
  const { _id } = props.obj;

  localStorage.setItem("show_id", _id);

  const getChilddata = (data, selectedSeatsArr) => {
    // (no local state needed here; we pass final data up)
    const copy = {
      showName: props.obj.showName,
      location: props.obj.location,
      theater: props.obj.theater,
      date: props.obj.date,
      time: props.obj.time,
      seats: data,
    };
    props.getfinaldata(copy);
  };

  return (
    <div>
      <SeatsCheck obj={prevSelected} getSelectedSeatChildData={getChilddata} />
    </div>
  );
};

export { SeatBooking, SeatsCheck };
export default SeatBooking;
