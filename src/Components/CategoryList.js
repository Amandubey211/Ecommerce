import React from "react";
import useSimilarCategories from "../Utils/useSimilarCategories";
import { useNavigate } from "react-router-dom";
import Shimmer from "../Components/Shimmer";
const CategoryList = ({ title }) => {
  const myproduct = useSimilarCategories(title);
  const Navigate = useNavigate();

  return (
    <>
      {myproduct?.products ? (
        <div className="d-flex justify-content-center flex-column align-items-between px-4 gap-2">
          {myproduct?.products?.map((item, i) => {
            return (
              <div key={i}>
                <div
                  className="row categoryCard rounded-1  p-1 border"
                  onClick={() => {
                    Navigate(`/productdetail/${item.id}`);
                  }}
                >
                  <div className="col-9">
                    <div className="d-flex flex-column justify-content-center align-items-start">
                      <h5>{item.title}</h5>
                      <div className="d-flex justify-content-start align-items-center gap-2">
                        <span className="btn btn-warning  p-0 px-2">
                          {" "}
                          $ {item.price}
                        </span>
                        <span className="btn btn-success  p-0 px-2">
                          {" "}
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 p-1">
                    <div className="d-flex justify-content"></div>
                    <img
                      src={item.thumbnail}
                      style={{ height: "60px", width: "110px" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="d-flex flex-column gap-2 pb-2">
          <Shimmer height="30px" />
          <Shimmer height="30px" />
        </div>
      )}
    </>
  );
};

export default CategoryList;
