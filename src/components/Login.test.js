import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  test("login button is render", () => {
    render(<Login />);
    const button = screen.getByRole("button", {
      name: "login"
    });
    expect(button).toBeInTheDocument();
  });
  test("Alert not rendered", () => {
    render(<Login />);
    const alertButton = screen.getByRole("button", {
      name: "alert"
    });
    expect(alertButton).not.toBeInTheDocument();
  });
});
