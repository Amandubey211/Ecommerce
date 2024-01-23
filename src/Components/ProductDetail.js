import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { useNavigate } from "react-router-dom";
import useProductDetails from "../Utils/useProductDetails";
import useSimilarCategories from "../Utils/useSimilarCategories";
import ProductCard from "./ProductCard";
import { addItem } from "../Utils/AppStore/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ProductDetailRightInfo from "./ProductDetailRightInfo";

const ProductDetail = () => {
  const { PID } = useParams();
  const product = useProductDetails(PID);
  const similarProducts = useSimilarCategories(product?.category);
  const [currentImage, SetCurrentImage] = useState(product?.thumbnail);
  const Navigate = useNavigate();
  const productref = useRef(null);
  const dispatch = useDispatch();

  //----------------------------------------------------------------
  // only becase of this useEffect my testcase are failing if i uncomment it out of 26, 7 test case are being failed ,it taked my hole day to figure out how to solve this isuue but i cannot get the way to solve it.....
  //------------------------------------

  // if you are testing you need to comment out this useEffect.
  useEffect(() => {
    if (productref && productref.current) {
      productref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [PID]);

  const HandleAddItem = () => {
    dispatch(addItem(product));
    toast.success(`(${product.title}) added to the cart`);
    Navigate("/cart");
  };

  return (
    <div>
      <div className="row px-4">
        <span ref={productref}></span>
        <div className="col-lg-5 col-md-5 col-sm-12">
          <div className="p-2 px-3 d-flex justify-content-center gap-2 flex-column ">
            <div className="">
              {product === null ? (
                <Shimmer height="250px" width="400px" />
              ) : (
                <img
                  className="rounded-2"
                  style={{ height: "250px", width: "400px" }}
                  src={currentImage ? currentImage : product?.thumbnail}
                />
              )}
            </div>
            <div className="d-flex justify-content-center gap-2 align-items-center flex-wrap p-1 ">
              {product?.images?.slice(0, 4).map((item) => {
                return (
                  <div
                    key={item}
                    className="p-1 border"
                    onMouseOver={() => {
                      SetCurrentImage(item);
                    }}
                    onClick={() => {
                      SetCurrentImage(item);
                    }}
                  >
                    <img style={{ height: "40px" }} src={item} alt="products" />
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-center gap-2 align-items-center">
              <button
                className="p-2 px-4 btn-warning btn"
                data-testid="buyNow"
                onClick={HandleAddItem}
              >
                {" "}
                <b>Buy Now</b>
              </button>
              <button
                data-testid="addToCart"
                className="p-2 px-4 btn btn-outline-success "
                onClick={HandleAddItem}
              >
                <b> Add to Cart</b>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-md-5 col-sm-12 py-3">
          <ProductDetailRightInfo product={product} />
        </div>
      </div>
      <div className="d-flex justify-content-center  mt-4">
        <h4>Similar Products</h4>
      </div>
      <div className="d-flex justify-content-center flex-wrap align-items-center gap-3 mt-2 my-5 ">
        {similarProducts?.products?.slice(0, 5).map((item) => {
          return (
            <div
              data-testid="similarProducts"
              className=" rounded-2 "
              key={item.thumbnail}
              onClick={() => {
                Navigate(`/productdetail/${item.id}`);
              }}
            >
              <ProductCard
                width="180px"
                category={item.category}
                price={item.price}
                brand={item.brand}
                rating={item.rating}
                title={item.title}
                thumbnail={item.thumbnail}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetail;
