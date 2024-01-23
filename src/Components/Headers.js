import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const [login, Setlogin] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <>
      <div data-testid="reactToaster">
        <Toaster />
      </div>
      <div className="d-flex justify-content-between px-5 b py-2">
        <div>
          <Link to="/" className="text-reset text-decoration-none fs-3 fw-bold">
            <b style={{ color: "#ffc107" }}>A</b>man{" "}
            <b style={{ color: "#ffc107" }}>D</b>ubey
          </Link>
        </div>
        <div>
          <div className="d-flex justify-content-center align-items-center gap-4 fw-bold  text-capitalize">
            <Link
              className=" text-reset text-decoration-none font-bold underline"
              to="/"
            >
              home
            </Link>
            <Link
              className=" text-reset text-decoration-none bg-orange-800"
              to="/about"
            >
              About
            </Link>

            <Link
              data-testid="cart"
              className=" text-reset text-decoration-none"
              to="/cart"
            >
              Cart ({cartItems?.length})
            </Link>

            <button
              className="p-1 px-2 btn btn-primary"
              title="AuthBtn"
              value={login}
              name="login"
              onClick={() => {
                Setlogin(!login);
              }}
            >
              {login ? <span>Login</span> : <span title="Signup">Signup </span>}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Header;
