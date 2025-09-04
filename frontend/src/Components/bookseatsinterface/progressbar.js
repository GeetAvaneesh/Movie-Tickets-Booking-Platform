// ProgressBarComponent.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Button } from "react-bootstrap";
import DateCityTheaterTime from "./utils/datecitytheatertime";
import { SeatBooking } from "./utils/selectseats";
import Payment from "./utils/payment";
import Ticket from "./utils/eticket";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./utils/styles.css";
import CustomAlert from "./utils/alert";

const ProgressBarComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState("");
  const [step, setStep] = useState(1);
  const [seatItems, setSeatItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const [progressData, setProgressData] = useState({
    city: "",
    theaterName: "",
    showDate: "",
    time: "",
    name: "",
  });

  const [showDetails, setShowDetails] = useState({});
  const [finalData, setFinalData] = useState({});
  const [canProceed, setCanProceed] = useState(false);

  // --- Handlers ---
  const proceed = () => setCanProceed(true);
  const dontProceed = () => setCanProceed(false);

  const handleSelectionChange = (selectedData) => {
    setProgressData((prev) => ({ ...prev, ...selectedData }));
  };

  const getSelectedSeatChildData = (data) => setSeatItems(data);
  const getFinalData = (data) => setFinalData(data);

  const unsetAlert = () => setShowAlert(false);

  // --- Fetch Movie Details ---
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/movies/get-details/${id}`
    )
      .then((res) => {
        if (res.status === 200) {
          setMovie(res.data.name);
          localStorage.setItem("movie", res.data.name);
        } else {
          throw new Error("Failed to fetch movie details");
        }
      })
      .catch((err) => alert(err.message));
  }, [id]);

  // --- API Calls ---
  const handleSubmitStep1 = () => {
    Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/shows/createshow`,
      {
        showName: movie,
        time: progressData.time,
        date: progressData.showDate,
        location: progressData.city,
        theater: progressData.theaterName,
      }
    )
      .then((res) => {
        if (res.status === 200) {
          setShowDetails(res.data);
        }
      })
      .catch((err) => alert("Error creating show: " + err.message));
  };

  const handleSubmitStep2 = () => {
    console.log("Selected Seats:", seatItems);
    console.log("Final Data:", finalData);
  };

  // --- Navigation ---
  const handleNext = () => {
    if (!canProceed) {
      setShowAlert(true);
      return;
    }

    if (step < 4) {
      if (step === 1) handleSubmitStep1();
      if (step === 2) handleSubmitStep2();

      setStep((prev) => prev + 1);
    } else {
      navigate("/");
    }
  };

  const handleBack = () => {
    if (step === 1 || step === 3) {
      navigate("/");
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  // --- Progress ---
  const calculateProgress = () => ((step - 1) / 3) * 100;

  // --- UI ---
  return (
    <div className="container mt-5">
      {showAlert && (
        <CustomAlert type="warning" message="Complete the Steps" onClose={unsetAlert} />
      )}

      {/* Step Circles */}
      <div className="row justify-content-between align-items-center">
        {[1, 2, 3, 4].map((circle) => (
          <div
            key={circle}
            className={`col-auto circle ${circle === step ? "active" : ""} ${
              circle < step ? "completed" : ""
            }`}
          >
            {circle}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <ProgressBar now={calculateProgress()} className="my-3" />

      {/* Step Content */}
      {step === 1 && movie && (
        <DateCityTheaterTime
          onSelectionChange={handleSelectionChange}
          proceed={proceed}
          dontproceed={dontProceed}
          moviename={movie}
        />
      )}
      {step === 2 && (
        <SeatBooking
          obj={showDetails}
          getfinaldata={getFinalData}
          getSelectedSeatChildData={getSelectedSeatChildData}
          proceed={proceed}
          dontproceed={dontProceed}
        />
      )}
      {step === 3 && <Payment finaldata={finalData} />}
      {step === 4 && <Ticket finaldata={finalData} items={seatItems} />}

      {/* Navigation Buttons */}
      <div className="text-center mt-3">
        <Button variant="secondary" onClick={handleBack} disabled={step === 4}>
          {step === 3 ? "Cancel Payment" : "Go Back"}
        </Button>{" "}
        <Button variant="primary" onClick={handleNext}>
          {step === 4
            ? "Finish"
            : step === 3
            ? "Confirm Payment"
            : step === 2
            ? "Proceed to Payment"
            : "Select Seats"}
        </Button>
      </div>
    </div>
  );
};

export default ProgressBarComponent;
