import React, { useState } from "react";

const SeatsCheck = ({ obj, getChilddata }) => {
  const seatsarr = obj.seats;
  const [amount, setAmount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  const handleSeatClick = (seatId, isOccupied) => {
    if (isOccupied) return; // prevent clicking occupied seats

    const updatedSelectedSeats = new Set(selectedSeats);

    if (updatedSelectedSeats.has(seatId)) {
      updatedSelectedSeats.delete(seatId);
      setAmount((prev) => prev - 200);
    } else {
      updatedSelectedSeats.add(seatId);
      setAmount((prev) => prev + 200);
    }

    setSelectedSeats(updatedSelectedSeats);
  };

  const handleConfirm = () => {
    const updatedSeats = seatsarr.map((seatData) => {
      if (selectedSeats.has(seatData.seatId)) {
        return {
          ...seatData,
          isOccupied: true,
          userDetails: localStorage.getItem("id"),
        };
      }
      return seatData;
    });

    getChilddata(updatedSeats);
  };

  const renderSeats = () => {
    return Array.from({ length: 8 }, (_, rowIndex) => (
      <div key={rowIndex} className="row">
        {Array.from({ length: 8 }, (_, colIndex) => {
          const seatIndex = rowIndex * 8 + colIndex;
          const seatData = seatsarr[seatIndex];

          return (
            <div
              key={seatIndex}
              className={`col-1 btn ${
                seatData.isOccupied
                  ? "btn-dark"
                  : selectedSeats.has(seatData.seatId)
                  ? "btn-success"
                  : "btn-light"
              }`}
              onClick={() => handleSeatClick(seatData.seatId, seatData.isOccupied)}
              style={{ cursor: seatData.isOccupied ? "not-allowed" : "pointer" }}
            >
              {seatData.seatId}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <center>
      <div className="container">
        {renderSeats()}
        <p className="mt-2">
          Selected Seats: {Array.from(selectedSeats).join(", ") || "None"}
        </p>
        <p>Total Amount: ₹{amount}</p>
        <button
          className="btn btn-success"
          onClick={handleConfirm}
          disabled={selectedSeats.size === 0}
        >
          Confirm Tickets
        </button>
      </div>
    </center>
  );
};

export default SeatsCheck;
