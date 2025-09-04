import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import CustomAlert from "../../bookseatsinterface/utils/alert";

const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const username = localStorage.getItem("username");
  const isLogged = localStorage.getItem("islogged") === "true";
  const navigate = useNavigate();

  const unsetAlert = () => setShowAlert(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLogged) {
      navigate("/auth");
      return;
    }

    if (!feedback.trim()) {
      // nothing to submit
      return;
    }

    try {
      const currentDate = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        currentDate
      );

      const feedbackData = {
        username,
        feedback,
        time: formattedDate,
      };

      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/feedbacks/add-feedback`,
        feedbackData
      );

      if (res.status === 200) {
        setShowAlert(true);
        setFeedback("");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Error submitting feedback. Please try again.");
    }
  };

  const getColor = () =>
    localStorage.getItem("darkmode") === "yes" ? "text-light" : "text-dark";

  const getBg = () =>
    localStorage.getItem("darkmode") === "yes" ? "bg-dark" : "bg-light";

  return (
    <footer className={`${getBg()} text-white mt-5 py-2`}>
      {showAlert && (
        <CustomAlert
          type="success"
          message={"Thanks for the Feedback"}
          onClose={unsetAlert}
        />
      )}

      <div className="container-fluid">
        <div className="row">
          {/* Brand */}
          <div className="col-md-12">
            <div className="app-info">
              <h1 className={`${getColor()} text-center app-name styled`}>
                <span className="app-initial text-danger">Reel</span>Ruckus
              </h1>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-md-4">
            <div className="footer-title mb-4">
              <b className={`${getColor()}`}>Useful Links</b>
            </div>
            <ul className="list-unstyled">
              <li>
                <Link to="/FAQ" className={`${getColor()} text-decoration-none`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className={`${getColor()} text-decoration-none`}
                >
                  About Us
                </Link>
              </li>
              <li className={`${getColor()}`}>Advertise with Us</li>
              <li className={`${getColor()}`}>Terms and Conditions</li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-md-4">
            <div className="footer-title mb-4">
              <b className={`${getColor()}`}>Help</b>
            </div>
            <ul className="list-unstyled">
              <li className={`${getColor()}`}>Help Me</li>
              <li className={`${getColor()}`}>Feedback</li>
              <li className={`${getColor()}`}>Report an Issue / Bug</li>
            </ul>
          </div>

          {/* Feedback form */}
          <div className="col-md-4">
            <div className="footer-title mb-4">
              <b className={`${getColor()}`}>Feedback</b>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <textarea
                  onChange={(e) => setFeedback(e.target.value)}
                  value={feedback}
                  className="form-control h-150"
                  placeholder="Message..."
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-danger">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={`${getColor()} ${getBg()} text-center py-3`}>
        Copyright &copy; 2023 | ReelRuckus
      </div>
    </footer>
  );
};

export default Footer;
