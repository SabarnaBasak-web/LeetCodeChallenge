export const extractDigits = (inputString) => {
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

export const formatFirstThreeDigits = (phoneNumber) => {
  return `(${phoneNumber.substring(0, 3)}) ` + phoneNumber.substring(3);
};

export const formatFirstSixDigits = (phoneNumber) => {
  return `(${phoneNumber.substring(0, 3)}) ` + phoneNumber.substring(3, 6);
};

export const formatMorethanSixDigits = (phoneNumber) => {
  return formatFirstSixDigits(phoneNumber) + "-" + phoneNumber.substring(6);
};
