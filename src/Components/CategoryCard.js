import React, { useState } from "react";
import CategoryList from "./CategoryList";
import toast from "react-hot-toast";

const CategoryCard = ({ item, showlist, SetCategoryIndex, closeIndex }) => {
  return (
    <div>
      <div
        style={{
          width: "600px",
          cursor: "pointer",
        }}
        onClick={() => {
          if (showlist) {
            closeIndex();
          } else {
            SetCategoryIndex();
            if (item) {
              toast.success("fetched successfully");
            } else {
              toast.loading("Fetching...");
            }
          }
        }}
        className="d-flex flex-column rounded-2 gap-2 justify-content-center  p-1 px-3 categoryCard"
      >
        <div className="d-flex rounded-2 justify-content-between align-items-center py-1 px-3">
          <div className="text-uppercase fw-semibold" c>
            {item}(5)
          </div>
          <div className="fs-3">{showlist ? <div>x</div> : <div>⬇️</div>}</div>
        </div>
        <div className="gap-2 ">
          {showlist ? <CategoryList title={item} /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
