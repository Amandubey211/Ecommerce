import React from "react";

const CartQuantity = ({
  DecreaseQuantity,
  IncreaseQuantity,
  quantity,
  stock,
}) => {
  return (
    <div className="">
      <div className="  d-flex justify-content-center align-items-center gap-2">
        <span
          onClick={DecreaseQuantity()}
          className={` px-2 p-1 fw-bold  quantitymanuplateBtn rounded-2   ${
            quantity === 1 ? "d-none" : ""
          }`}
        >
          -
        </span>
        <span className="border px-2 fs-5 "> {quantity}</span>
        <span
          className=" quantitymanuplateBtn fw-bold rounded-2 p-1 px-2"
          onClick={() => IncreaseQuantity(stock)}
        >
          +
        </span>
      </div>
      {/* <div>
        {quantity === stock && (
          <span style={{ color: "red",fontSize:"10px" }}> not available</span>
        )}
      </div> */}
    </div>
  );
};

export default CartQuantity;
