import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../Pages/Home";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import MockData from "./Mocks/HomeProductData.json";
import "@testing-library/jest-dom";
import "./Mocks/mockMatchMedia";
import Header from "../Components/Headers";
import { Provider } from "react-redux";
import appStore from "../Utils/AppStore/appStore";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MockData);
    },
  });
});

jest.mock("../Animations/NoInternet.gif", () => "mocked-gif-path");
test("should render the home component with the search input in it and when it is clicked it shoud be listed with the result for example we gave iphone it should shows us 2 lists ", async () => {
  await act(async () =>
    // rendering the home page-------------
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );

  // querrying the search input-----------
  const cardBeforeSearch = screen.getAllByTestId("productCard");
  expect(cardBeforeSearch.length).toBe(30);
  const searchInput = screen.getByTestId("searchInput");
  const SearchBtn = screen.getByTestId("searchBtn");
  fireEvent.change(searchInput, { target: { value: "iphone" } });
  fireEvent.click(SearchBtn);
  const Cards = screen.getAllByTestId("productCard");

  //Assertion
  expect(Cards.length).toBe(2);
});

test("should return 14 product card if clicked on the top Rated  button of the home", async () => {
  await act(async () =>
    //render
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );

  //querrrying
  const TopRatedBtn = screen.getByTestId("topRatedBtn");
  fireEvent.click(TopRatedBtn);

  const cards = screen.getAllByTestId("productCard");
  //assertion
  expect(cards.length).toBe(14);
});

test("should return a toast if no search result found", async () => {
  await act(async () =>
    //render
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <Home />
        </Provider>
      </BrowserRouter>
    )
  );
  // querrying
  const searchInput = screen.getByTestId("searchInput");
  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "aman" } });
  fireEvent.submit(searchInput);
  // await waitFor(() => {
  const toastNotification = screen.getByTestId("reactToaster");
  expect(toastNotification).toBeInTheDocument();
  expect(toastNotification).toHaveTextContent(
    "sorry no items found try another product"
  );
  // });
});

test("should return a toast message if there is nothing in the input box", async () => {
  //render
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <Home />
        </Provider>
      </BrowserRouter>
    )
  );
  //querying
  const searchInput = screen.getByTestId("searchInput");
  expect(searchInput).toBeInTheDocument();

  fireEvent.submit(searchInput);

  // assertion
  await waitFor(() => {
    const toastNotification = screen.getByTestId("reactToaster");
    expect(toastNotification).toBeInTheDocument();
    expect(toastNotification).toHaveTextContent("please enter something first");
  });
});

test("should return  all the initial value/items on the page as it was on the initial time", async () => {
  await act(async () =>
    //render
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <Home />
        </Provider>
      </BrowserRouter>
    )
  );

  // querryying
  const AllProductBtn = screen.getByTestId("AllProductBtn");
  const TopRatedProductBtn = screen.getByTestId("topRatedBtn");
  fireEvent.click(TopRatedProductBtn);
  const TopRatedList = screen.getAllByTestId("promotedLabel");

  expect(TopRatedList.length).toBe(14);

  fireEvent.click(AllProductBtn);
  const AllProductList = screen.getAllByTestId("productCard");
  expect(AllProductList.length).toBe(30);
});
