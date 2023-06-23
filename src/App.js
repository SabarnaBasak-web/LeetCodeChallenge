import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const inputRef = useRef(null);

  const extractDigits = (inputString) => {
    let len = inputString.length;
    let validNumber = "";
    for (let i = 0; i < len; i++) {
      let ascValue = inputString.charCodeAt(i);
      if (ascValue >= 48 && ascValue <= 57) {
        validNumber += inputString.charAt(i);
      }
    }
    return validNumber;
  };

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
      formattedPhoneNumber =
        `(${phoneNumber.substring(0, 3)}) ` + phoneNumber.substring(3);
      inputValue = "";
    }
    if (phoneNumber.length === 3) {
      formattedPhoneNumber = phoneNumber;
      inputValue = "";
    }

    if (phoneNumber.length >= 7) {
      formattedPhoneNumber =
        `(${phoneNumber.substring(0, 3)}) ` +
        phoneNumber.substring(3, 6) +
        "-" +
        phoneNumber.substring(6);

      inputValue = "";
    }

    if (phoneNumber.length === 6) {
      formattedPhoneNumber =
        `(${phoneNumber.substring(0, 3)}) ` + phoneNumber.substring(3, 6);

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
