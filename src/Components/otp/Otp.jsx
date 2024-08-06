import React, { useState } from "react";
import "./otp.css";

const Otp = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;

    setOtp([
      ...otp.map((data, indx) => (indx === index ? e.target.value : data)),
    ]);

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  return (
    <div className="otp-container">
      <h3>Enter OTP</h3>
      <div className="otp-area">
        {otp.map((data, i) => (
          <input
            key={i}
            type="text"
            className="inp"
            value={data}
            maxLength={1}
            onChange={(e) => handleChange(e, i)}
          />
        ))}
      </div>
      <button className="btn" onClick={()=>{
        alert(otp.join(""))
      }}>Submit</button>
    </div>
  );
};

export default Otp;
