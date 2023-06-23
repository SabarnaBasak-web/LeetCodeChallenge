import "./App.css";
import { useState, useRef } from "react";
import {
  extractDigits,
  formatFirstSixDigits,
  formatMorethanSixDigits,
  formatFirstThreeDigits,
} from "./helper";
function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const inputRef = useRef(null);

  const onInputHandler = (event) => {
    let inputValue = event.target.value;

    // move the cursor to the end of the string
    if (event.nativeEvent.data === null) {
      inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
    }

    // formatting the input value
    let phoneNumber = extractDigits(inputValue);
    let formattedPhoneNumber = "";

    if (phoneNumber.length >= 4) {
      formattedPhoneNumber = formatFirstThreeDigits(phoneNumber);
      inputValue = "";
    }
    if (phoneNumber.length === 3) {
      formattedPhoneNumber = phoneNumber;
      inputValue = "";
    }

    if (phoneNumber.length >= 7) {
      formattedPhoneNumber = formatMorethanSixDigits(phoneNumber);
      inputValue = "";
    }

    if (phoneNumber.length === 6) {
      formattedPhoneNumber = formatFirstSixDigits(phoneNumber);
      inputValue = "";
    }
    setPhoneNumber(formattedPhoneNumber + inputValue);
  };

  return (
    <>
      <div className="container">
        <h1 data-testid="heading">Leet Code Assesment</h1>
        <input
          type="tel"
          ref={inputRef}
          value={phoneNumber}
          onChange={onInputHandler}
          placeholder="mobile number"
          autoComplete="off"
          maxLength="16"
          id="phone"
          data-testid="phoneInput"
        />
        <label htmlFor="phone" id="label">
          (123) 456-7890
        </label>
      </div>
    </>
  );
}

export default App;
