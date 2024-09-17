import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

export default function OtpPass({ onOtpChange }) {
  const inputRefs = useRef([]);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]); 

  const handleOtpChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    onOtpChange(newOtpValues.join(''));
    
    if (value !== "" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="text-center pt-7">
      <label
        htmlFor="otp"
        className="block text-xl font-bold leading-8 text-gray-900 pb-7"
      >
        Enter OTP
      </label>
      <div className="flex justify-center">
        {otpValues.map((value, index) => (
          <input
            key={index}
            type="tel"
            inputMode="numeric"
            name={`otp-${index}`}
            maxLength="1"
            pattern="[0-9]"
            value={value}
            onChange={(e) => handleOtpChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            required
            className="w-10 h-10 m-1 rounded-md border text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm appearance-none"
          />
        ))}
      </div>
    </div>
  );
}

OtpPass.propTypes = {
  onOtpChange: PropTypes.func.isRequired,
};