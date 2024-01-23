import { render, screen } from "@testing-library/react";
import Contact from "../Pages/Contact";
import "@testing-library/jest-dom";

// learning how to test the project--------------------

// unit testing
describe("Contact us page test cases", () => {
  test("contat rendered", () => {
    render(<Contact />);
  });

  test("heading present", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test("button present ", () => {
    render(<Contact />);
    const Button = screen.getByRole("button");
    expect(Button).toBeInTheDocument();
  });

  test("2 inputs", () => {
    render(<Contact />);

    const Inputs = screen.getAllByRole("textbox");
    expect(Inputs.length).toBe(1);
  });

  it("contact us text", () => {
    render(<Contact />);
    const NameInput = screen.getByPlaceholderText("enter your name");
    expect(NameInput).toBeInTheDocument();
  });
  test("send title", () => {
    render(<Contact />);
    const sendTitle = screen.getByTitle("send");
    expect(sendTitle).toBeInTheDocument();
  });
});

// basic of testing----------

//render
//quering
//asserting
