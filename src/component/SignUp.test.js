import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
describe("SignUp Component", () => {
  test("display SignUp Form Heading", () => {
    render(<SignUp />);
    const linkElement = screen.getByText("Sign Up");
    expect(linkElement).toBeInTheDocument();
  });
  test("Checking label text", () => {
    render(<SignUp />);
    const inputPassword = screen.getByLabelText("Password");
    expect(inputPassword).toBeInTheDocument();
  });
  test("testing input of username is present or not", () => {
    render(<SignUp />);
    const userElement = screen.getByPlaceholderText("Enter email");
    expect(userElement).toBeInTheDocument();
  });
});
