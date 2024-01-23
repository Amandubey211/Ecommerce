import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CartQuantity from "./CartQuantity";
import { removeItem } from "../Utils/AppStore/cartSlice";
import toast from "react-hot-toast";

const CartItems = ({ item }) => {
  const [quantity, SetQuantity] = useState(1);

  const dispatch = useDispatch();
  const IncreaseQuantity = (stock) => {
    const limit =  Math.floor(stock/3)
    console.log(limit)
    if (quantity < limit) {
      SetQuantity(quantity + 1);
    } else {
      toast.error("Limit Exceeded");
    }
  };
  const DecreaseQuantity = () => {
    if (quantity > 1) {
      SetQuantity(quantity - 1);
    }
  };
  const RemoveFromCart = (item) => {
    dispatch(removeItem(item.title));
    toast(`(${item.title}) has been removed `, {
      icon: "👍",
    });
  };
  return (
    <div>
      <div data-testid="cartItems" className="row border p-2 ">
        <div className="col-2">
          <img
            className="rounded-2"
            src={item?.thumbnail}
            style={{ height: "90px", width: "90px" }}
          />
        </div>
        <div className="col-8 ps-4">
          <div className="d-flex flex-column  gap-1">
            <b>{item?.title}</b>
            <span>{item?.brand}</span>
            <div className="d-flex   gap-3 ">
              <h5 className=" rounded-2">$ {item?.price.toFixed(2)}</h5>
              <span
                className="text-muted"
                style={{ textDecoration: "line-through" }}
              >
                $
                {(item?.price / (1 - item.discountPercentage / 100)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="col-2 py-2">
          <div className="d-flex flex-column gap-3">
            <button
              data-testid="removeProductButton"
              className="btn btn-outline-danger"
              onClick={() => {
                RemoveFromCart(item);
              }}
            >
              remove
            </button>
            {/* <div className="btn btn-warning">{item.rating}</div> */}

            <CartQuantity
              stock={item.stock}
              IncreaseQuantity={() => IncreaseQuantity(item?.stock)}
              DecreaseQuantity={() => DecreaseQuantity}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
