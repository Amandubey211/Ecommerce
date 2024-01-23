import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import MockProductDetail from "./Mocks/ProductCartProps.json";
import ProductDetail from "../Components/ProductDetail";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import appStore from "../Utils/AppStore/appStore";
import Header from "../Components/Headers";
import Cart from "../Pages/Cart";
import "./Mocks/mockMatchMedia";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MockProductDetail);
    },
  });
});

// jest.mock("../Animations/NoInternet.gif", () => "mock-gif-data");
test("should load product Details page and should have a buy now button ", async () => {
  await act(async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={appStore}>
          <ProductDetail />
        </Provider>
      </BrowserRouter>
    );
  });

  // to check whether it is on the product detail page we can check that is there a buy now option or not if it is on the page it is rendered
  await waitFor(() => {
    const buyNowbtn = screen.getByTestId("buyNow");
    const AddToCartBtn = screen.getByTestId("addToCart");
    //Assertions
    expect(buyNowbtn).toBeInTheDocument();
    expect(AddToCartBtn).toBeInTheDocument();
  });
});

test("should have the desired product on the page ", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <ProductDetail />
        </Provider>
      </BrowserRouter>
    );
  });

  //querrying the required thing
  const productName = screen.getByTestId(MockProductDetail.title);
  expect(productName).toBeInTheDocument();
});
jest.mock(
  "../Animations/EmptyCart.gif",
  () => "mock-data-of-the-empty-cart-gif"
);

test("should add the product on cart page when  clicked on the add to cart button ", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <ProductDetail />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  // querrying will be done here

  // getting the  add to cart button
  const addToCartButton = screen.getByTestId("addToCart");
  // getting the cart link from header

  const cartToBeZero = screen.getByText("Cart (0)");
  expect(cartToBeZero).toBeInTheDocument();

  // onClick event on the add to cart button
  fireEvent.click(addToCartButton);
  // fireEvent.click(addToCartButton);
  const cartToBeOne = screen.getByText("Cart (1)");
  expect(cartToBeOne).toBeInTheDocument();

  fireEvent.click(addToCartButton);
  // get the lists of the cart items
  const cartList = screen.getAllByTestId("cartItems");
  expect(cartList.length).toBe(2);
});

test("should remove the product while we click on the remove btn", async () => {
  //render
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <ProductDetail />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  // querrying
  // getting the removecart buttonr-------------------
  const removeFromCart = screen.getAllByTestId("removeProductButton");

  // //checkin in the he
  // const cartLinktest = screen.getByText("Cart (2)");
  // expect(cartLinktest).toBeInTheDocument();

  // get the lists of the cart items
  const cartList = screen.getAllByTestId("cartItems");
  expect(cartList.length).toBe(2);

  fireEvent.click(removeFromCart[0]);
  //cart list reduced to 1--------------
  expect(screen.getByText("Cart (1)"));

  expect(screen.getAllByTestId("cartItems").length).toBe(1);
  fireEvent.click(screen.getByTestId("removeProductButton"));
});

test("should remove all the cart if clear cart button clicked", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <ProductDetail />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  //querry
  expect(screen.getByTestId("emptyCart")).toBeInTheDocument();
  const addToCartButton = screen.getByTestId("addToCart");
  fireEvent.click(addToCartButton);

  const clearCartBtn = screen.getByTestId("clearCartBtn");
  fireEvent.click(clearCartBtn);
  // expect(screen.getAllByTestId("cartItems").length).toBe(0)
  expect(screen.getByTestId("emptyCart")).toBeInTheDocument();
});

test("should get a toast when changing the address", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <ProductDetail />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  const addToCartButton = screen.getByTestId("addToCart");
  fireEvent.click(addToCartButton);

  // querrying
  const ChangeAddressBtn = screen.getByTestId("changeAdressBtn");
  fireEvent.click(ChangeAddressBtn);
});
