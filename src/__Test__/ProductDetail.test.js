import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ProductDetail from "../Components/ProductDetail";
import { act } from "react-dom/test-utils";
import similarMockData from "./Mocks/similarProduct.json";
import appStore from "../Utils/AppStore/appStore";
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(similarMockData);
    },
  });
});


test("should renders 5 similar product on the product detail page", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <ProductDetail />
        </Provider>
      </BrowserRouter>
    );
  });
  //querrying
  // getting the list of the similar products
  const similarProducts = screen.getAllByTestId("similarProducts");

  // assertions
  expect(similarProducts.length).toBe(5);
});

test("should check that the scroll behavior  when click on any one of the similar product ", () => {});
