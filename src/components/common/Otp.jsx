import { useRef, useState } from "react";
import PropTypes from "prop-types"; // Import prop-types library

export default function Otp({ onOtpChange }) {
  const inputRefs = useRef([]);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]); // Initialize an array to store OTP digits
  const handleOtpChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    onOtpChange(newOtpValues);
    // Move focus to the next input box if the current input is not empty
    if (value !== "" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
      // Move focus to the previous input box if Backspace is pressed and the current input is empty
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <div className="text-center pt-2">
      <label
        htmlFor="otp"
        className="block text-xl font-bold leading-8 text-gray-900 pb-2"
      >
        Enter Otp
      </label>
      <div className="flex justify-center">
        {otpValues.map((value, index) => (
          <input
            key={index}
            type="tel" // Use 'tel' type to remove spinners on most browsers
            inputMode="numeric" // Use 'numeric' input mode to show numeric keyboard on mobile devices
            name={`otp-${index}`}
            maxLength="1"
            pattern="[0-9]"
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
Otp.propTypes = {
  onOtpChange: PropTypes.func.isRequired,
};

