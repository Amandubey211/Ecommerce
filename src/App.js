import React, { Suspense, lazy, useEffect, useState } from "react";
import Header from "./Components/Headers";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Pages/Cart";
import { Provider } from "react-redux";
import appStore from "./Utils/AppStore/appStore";

const About = lazy(() => import("./Pages/About"));
const Category = lazy(() => import("./Pages/Category"));
const App = () => {
  const [loading, SetLoading] = useState(true);
  const MovingAnimation = document.getElementById("loading-animation");
  useEffect(() => {
    if (MovingAnimation) {
      setTimeout(() => {
        MovingAnimation.style.display = "none";
        SetLoading(false);
      }, 500);
    }
  }, []);
  return (
    <>
      {!loading && (
        <Provider store={appStore}>
          <Header />

          <Outlet />
        </Provider>
      )}
    </>
  );
};

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/about",
        element: (
          <Suspense fallback={<h3>please wait</h3>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/allcategory",
        element: (
          <Suspense fallback={<h3>please wait</h3>}>
            <Category />
          </Suspense>
        ),
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/productdetail/:PID",
        element: <ProductDetail />,
      },
    ],
  },
]);
