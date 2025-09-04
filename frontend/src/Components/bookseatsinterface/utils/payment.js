import React, { useState } from "react";

const Payment = ({ finaldata }) => {
  const [formData, setFormData] = useState({
    cardholderName: "",
    creditCardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const getcolor = () =>
    localStorage.getItem("darkmode") === "yes" ? "text-light" : "text-dark";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container mt-5">
      <h2 className={`text-center mb-4 ${getcolor()}`}>Payment Details</h2>

      <div className="card p-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="cardholderName">Cardholder's Name</label>
              <input
                type="text"
                className="form-control"
                id="cardholderName"
                value={formData.cardholderName}
                onChange={handleChange}
              />

              <label htmlFor="expMonth" className="mt-3">Exp Month</label>
              <input
                type="text"
                className="form-control"
                id="expMonth"
                value={formData.expMonth}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="creditCardNumber">Credit Card Number</label>
              <input
                type="text"
                className="form-control"
                id="creditCardNumber"
                value={formData.creditCardNumber}
                onChange={handleChange}
              />

              <div className="row mt-3">
                <div className="col-md-6">
                  <label htmlFor="expYear">Exp Year</label>
                  <input
                    type="text"
                    className="form-control"
                    id="expYear"
                    value={formData.expYear}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Debug only; remove if you want */}
        {console && console.log(finaldata)}
      </div>
    </div>
  );
};

export default Payment;
