import React from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "../Utils/useProductDetails";

const ProductDetailRightInfo = ({product}) => {

  return (
    <div>
      <div className="p-3 d-flex   flex-column   gap-1 ">
        <div className="productTitle d-flex justify-content-between">
          <h3 data-testid={product?.title}>{product?.title}</h3>
          <h6 className="btn btn-outline-success">{product?.category}</h6>
        </div>
        <div className="productTitle d-flex justify-content-between">
          <h6>
            {" "}
            Brand : <b>{product?.brand} </b>
          </h6>
        </div>
        <hr />{" "}
        <div className="p-1 d-flex gap-3 px-2   align-items-center">
          <h6 style={{ color: "white" }} className="bg-warning p-1 rounded-2">
            {product?.rating} Star
          </h6>
          <div>
            <h6
              className="bg-success  p-1 px-2 rounded-2"
              style={{ color: `${product?.stock < 10 ? "red" : "white"}` }}
            >
              {product?.stock} left
            </h6>
          </div>
        </div>
        <div className="productPrice d-flex justify-content-start align-items-center gap-3">
          <h3>${product?.price}</h3>
          <h5
            title="selling value"
            className="text-muted"
            style={{ textDecoration: "line-through" }}
          >
            $
            {(product?.price / (1 - product?.discountPercentage / 100)).toFixed(
              2
            )}
          </h5>

          <h5 style={{ color: "green" }}>{product?.discountPercentage}% Off</h5>
        </div>
        <div className="productDescription">
          <p>{product?.description}</p>
        </div>
        <div className="btn btn-primary">More About this Product</div>
      </div>
    </div>
  );
};

export default ProductDetailRightInfo;
