import React from "react";

const ProductCard = ({
  brand,
  category,
  width,
  height,
  id,
  thumbnail,
  rating,
  price,
  title,
}) => {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      data-testid="productCard"
      className="   productCard d-flex justify-content-top flex-column  rounded-2  gap-2 align-items "
      key={id}
    >
      <div className="d-flex justify-content-center ">
        <img
          className="rounded-2 pt-1 "
          style={{ height: "120px", maxWidth: "180px" }}
          src={thumbnail}
          alt={thumbnail}
        />
      </div>
      <div className="border-bottom  d-flex justify-content-center align-items-center gap-1 px-2 ">
        <h6>{title}</h6>
      </div>
      <div className="ps-2 d-flex justify-content-center flex-column align-items-start flex-wrap  ">
        <h5> {price}$</h5>
        <h6 style={{ color: "white" }} className="bg-warning p-1 rounded-1 ">
          {" "}
          {rating} Stars
        </h6>
      </div>
    </div>
  );
};

export const PromotedCard = (ProductCard) => {
  return (props) => {
    return (
      <div>
        <div
          data-testid="promotedLabel"
          style={{ color: "white" }}
          className="  position-absolute   "
        >
          <button
            className="button-85 rounded-1"
            value="promoted"
            role="button"
          >
            Promoted
          </button>
        </div>
        <ProductCard {...props} />
      </div>
    );
  };
};

export default ProductCard;
