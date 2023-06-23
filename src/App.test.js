import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("test the phone format input", () => {
  test("renders learn react link", () => {
    render(<App />);
    const heading = screen.getByTestId("heading");
    expect(heading).toBeInTheDocument();
  });

  test("Value is entered it is formatted to the expected result", () => {
    render(<App />);
    const phoneField = screen.getByTestId("phoneInput");
    expect(phoneField).toBeInTheDocument();

    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "");
    expect(phoneField.value).toBe("");
    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "1234567890");
    expect(phoneField.value).toBe("(123) 456-7890");
    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "1234");
    expect(phoneField.value).toBe("(123) 4");
  });

  test("first three digits to be wrapped in braces once 4th digit is added and removed when the user removes the 4th digit", () => {
    render(<App />);
    const phoneField = screen.getByTestId("phoneInput");
    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "1234");
    expect(phoneField.value).toBe("(123) 4");

    // removing 4 from the above data
    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "123");
    expect(phoneField.value).toBe("123");

    // adding another digit after the first three
    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "1237");
    expect(phoneField.value).toBe("(123) 7");
  });
  test("add hyphen once user adds the 7th digits and gets removed once the user clicks on backspace", () => {
    render(<App />);
    const phoneField = screen.getByTestId("phoneInput");
    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "1234567");
    expect(phoneField.value).toBe("(123) 456-7");

    // removing 7 from the above data
    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "123456");
    expect(phoneField.value).toBe("(123) 456");

    // adding another digit after the first 6 values
    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "1234569");
    expect(phoneField.value).toBe("(123) 456-9");
  });

  test("move the cursor to the end of value when any digit is removed", () => {
    render(<App />);
    const phoneField = screen.getByTestId("phoneInput");
    fireEvent.change(phoneField, { target: { value: "" } });
    userEvent.type(phoneField, "1234567");
    expect(phoneField.value).toBe("(123) 456-7");
    phoneField.setSelectionRange(2, 2);
    userEvent.type(phoneField, "{backspace}");
    expect(phoneField.value).toBe("(234) 567");
    userEvent.type(phoneField, "8");
    expect(phoneField.value).toBe("(234) 567-8");
  });
});
