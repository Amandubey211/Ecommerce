import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Utils/AppStore/cartSlice";
import toast from "react-hot-toast";
import EmptyCartanimation from "../Animations/EmptyCart.gif";
import { Link, useNavigate } from "react-router-dom";
import CartItems from "../Components/CartItems";
import PaymentCartSection from "../Components/PaymentCartSection";
import EmptyCart from "../Components/EmptyCart";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const ClearCart = () => {
    dispatch(clearCart());
    toast.success("your cart has been emptyed");
  };
  return (
    <div>
      {cartItems?.length === 0 ? (
        <EmptyCart Animation={EmptyCartanimation} />
      ) : (
        <div className="row">
          <div className="col-8">
            <div className="d-flex p-2 m-2  addresCart   rounded-1 justify-content-between  align-items-center ">
              <div className=" d-flex flex-column align-items-start">
                <div className="">
                  Deliver to :
                  <span className="fs-6 fw-semibold "> Aman Dubey,400607</span>
                </div>
                <div>
                  {" "}
                  <span className="text-muted font-monospace">
                    178,F-block,gandinagar,thane(w){" "}
                  </span>{" "}
                </div>
              </div>
              <div>
                <button
                  data-testid="changeAdressBtn"
                  className="btn btn-primary rounded-1 "
                  onClick={() => {
                    toast.success("will be added in future");
                  }}
                >
                  change
                </button>
              </div>
            </div>

            <div
              className="d-flex px-5 cartScroll pt-1   flex-column gap-2 "
              style={{ height: "55vh", overflow: "scroll" }}
            >
              {cartItems?.map((item, i) => {
                return <CartItems item={item} key={i} />;
              })}
            </div>
            <div className="d-flex justify-content-end p-2 px-3 ">
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-outline-success"
                  onClick={() => {
                    Navigate("/allcategory");
                  }}
                >
                  Add Products
                </button>
                <button
                  data-testid="clearCartBtn"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    ClearCart();
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          <PaymentCartSection />
        </div>
      )}
    </div>
  );
};

export default Cart;
