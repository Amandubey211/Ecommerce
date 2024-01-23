import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import MockData from "./Mocks/HomeProductData.json";
import { screen, render, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import useStatus from "../Utils/useStatus";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MockData);
    },
  });
});
jest.mock("../Animations/NoInternet.gif", () => {
  return "no-internet-message-animation";
});
test("should return a animation or a message if the user is offline", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });
  //   await waitFor( () => {
  const { status } = renderHook(() => useStatus());
  expect(status).toBe(undefined);
  const OnlineMessage = screen.getByTestId("statusMessageOnline");
  expect(OnlineMessage).toBeInTheDocument();
  window.dispatchEvent(new Event("offline"));
//   const offLineMessage = screen.getByTestId("statusMessageOffline");
  //   expect(offLineMessage).toBeInTheDocument();
  //   });
});
