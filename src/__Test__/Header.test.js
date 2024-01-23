import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Components/Headers";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../Utils/AppStore/appStore";
import { BrowserRouter } from "react-router-dom";

test("should render the header component", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
});

test("should render the header component and the cart should be present with zero items", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const cartButton = screen.getByText("Cart (0)");
  expect(cartButton).toBeInTheDocument();
});

test("should render the login button", () => {
  //render
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //querying
  //   const loginButton = screen.getByRole("button", { name: "auth" });
  const loginButton = screen.getByTitle("AuthBtn");
  //   const loginButton = screen.getByRole("button",{name:"login"})

  //Assertion
  expect(loginButton).toBeInTheDocument();
});

test("should render the login button first and when there is a click event it should be signup button", () => {
  //render
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //querying
  //   const loginButton = screen.getByRole("button", { name: "auth" });
  const loginButton = screen.getByTitle("AuthBtn");
  fireEvent.click(loginButton);

  const logOutButton = screen.getByRole("button", { value: false });

  //Assertion
  expect(logOutButton).toBeInTheDocument();
});
