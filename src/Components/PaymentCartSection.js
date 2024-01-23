import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const PaymentCartSection = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [totalPrice, SetTotalPrice] = useState(0);
  const [actualPrice, SetActualPrice] = useState(0);
  useEffect(() => {
    const TTPrice = cartItems?.reduce((acc, item) => acc + item?.price, 0);
    SetTotalPrice(TTPrice.toFixed(2));
    const TDPrice = cartItems?.reduce(
      (acc, item) => acc + item?.price / (1 - item?.discountPercentage / 100),
      0
    );
    SetActualPrice(TDPrice.toFixed(2));
  }, [cartItems]);
  return (
    <div className="col-4 border p-3">
      {" "}
      Payment section
      <hr />
      <div className=" d-flex justify-content-between px-3 mb-2 ">
        <span>Price( {cartItems.length} Item )</span>
        <b>${actualPrice}</b>
      </div>
      <div className=" d-flex justify-content-between px-3 mb-2 ">
        <span>Discount</span>
        <b style={{ color: "green" }}>
          -${(actualPrice - totalPrice).toFixed(2)}
        </b>
      </div>
      <div className=" d-flex justify-content-between px-3 mb-2 ">
        <span>Devlivery charges </span>
        <div className="d-flex gap-2 align-items-center">
          {" "}
          <span style={{ textDecoration: "line-through" }}>$10</span>{" "}
          <b style={{ color: "green" }}>Free</b>
        </div>
      </div>
      <hr />
      <div className=" d-flex justify-content-between px-3  ">
        <b>Total Price to Pay</b>
        <b>${totalPrice}/-</b>
      </div>
      <hr />
      <div className="d-flex justify-content-center ">
        <button
          className="btn btn-warning"
          onClick={() => {
            toast.success("ordered");
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentCartSection;
