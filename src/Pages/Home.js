import React, { useState } from "react";
import ProductCard, { PromotedCard } from "../Components/ProductCard";
import Shimmer from "../Components/Shimmer";
import { useNavigate } from "react-router-dom";
import useAllProduct from "../Utils/useAllProduct";
import useStatus from "../Utils/useStatus";
import toast from "react-hot-toast";
import NoInternet from "../Animations/NoInternet.gif";
import OfflineMessage from "../Components/OfflineMessage";
const Home = () => {
  const [searchedText, setSearchedText] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const allProducts = useAllProduct();
  const status = useStatus();
  const Navigate = useNavigate();
  const PromotedProductCard = PromotedCard(ProductCard);

  const HandleSearch = (e) => {
    e.preventDefault();
    if (searchedText) {
      try {
        const filtered = allProducts?.filter((item) => {
          return (
            item?.title?.toLowerCase().includes(searchedText.toLowerCase()) ||
            item?.category?.toLowerCase().includes(searchedText.toLowerCase())
          );
        });
        if (filtered.length > 0) {
          setFilteredProduct(filtered);
        } else {
          toast.error("sorry no items found try another product");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast("please enter something first", {
        icon: "😁",
      });
    }
  };

  if (status === false) {
    return <OfflineMessage NoInternet={NoInternet} />;
  }

  return (
    <div data-testid="statusMessageOnline">
      <div className="d-flex flex-column  gap-3 p-2  px-5 ">
        <div className="d-flex justify-content-between   gap-2 px-3 py-3 align-items-center border-bottom">
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div>
              <button
                data-testid="AllProductBtn"
                className="p-1 px-3 btn-primary btn"
                role="button"
                name="AllProduct"
                onClick={() => {
                  setFilteredProduct([]);
                  setSearchedText("");
                }}
              >
                All
              </button>
            </div>
            <div>
              <button
                data-testid="topRatedBtn"
                className="p-1 px-3 btn btn-outline-primary"
                onClick={() => {
                  const highlyRated = allProducts.filter((item) => {
                    return item.rating > 4.5;
                  });

                  setFilteredProduct(highlyRated);
                }}
              >
                Top
              </button>
            </div>{" "}
            <div>
              <div
                className="p-1 px-3 btn btn-outline-primary d-flex justify-content-between  align-items-center "
                onClick={() => {
                  Navigate("/allcategory");
                }}
              >
                <span> All Categories</span>
              </div>
            </div>{" "}
          </div>

          <div className="filter">
            <form onSubmit={HandleSearch}>
              <fieldset className="d-flex justify-content-center align-items-center gap-1">
                <input
                  className=" ps-2 p-1 rounded-1 border-1"
                  type="text"
                  data-testid="searchInput"
                  placeholder="Searh product"
                  value={searchedText}
                  onChange={(e) => setSearchedText(e.target.value)}
                />
                <button
                  data-testid="searchBtn"
                  className="p-1 btn btn-outline-success px-2 "
                  type="submit"
                  onClick={HandleSearch}
                >
                  {" "}
                  search
                </button>
              </fieldset>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-center  p-1 gap-3 align-items-center flex-wrap  ">
          {allProducts.length === 0 ? (
            <div className="d-flex justify-content-center  gap-3 align-items-center p-1 flex-wrap">
              <Shimmer height="250px" width="200px" />
              <Shimmer height="250px" width="200px" />{" "}
              <Shimmer height="250px" width="200px" />{" "}
              <Shimmer height="250px" width="200px" />
              <Shimmer height="250px" width="200px" />{" "}
              <Shimmer height="250px" width="200px" />{" "}
              <Shimmer height="250px" width="200px" />
            </div>
          ) : (
            <>
              {filteredProduct.length > 0 ? (
                <>
                  {filteredProduct.map((item) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          Navigate(`/productdetail/${item.id}`);
                        }}
                        className=" rounded-3"
                        style={{ width: "250px" }}
                      >
                        {item.rating > 4.5 ? (
                          <PromotedProductCard
                            height="250px"
                            width="210px"
                            category={item.category}
                            price={item.price}
                            brand={item.brand}
                            rating={item.rating}
                            title={item.title}
                            thumbnail={item.thumbnail}
                          />
                        ) : (
                          <ProductCard
                            height="250px"
                            width="210px"
                            category={item.category}
                            price={item.price}
                            brand={item.brand}
                            rating={item.rating}
                            title={item.title}
                            thumbnail={item.thumbnail}
                          />
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {allProducts?.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          Navigate(`/productdetail/${item.id}`);
                        }}
                        key={item.id}
                      >
                        {item.rating > 4.5 ? (
                          <PromotedProductCard
                            height="250px"
                            width="210px"
                            category={item.category}
                            price={item.price}
                            brand={item.brand}
                            rating={item.rating}
                            title={item.title}
                            thumbnail={item.thumbnail}
                          />
                        ) : (
                          <ProductCard
                            height="250px"
                            width="210px"
                            category={item.category}
                            price={item.price}
                            brand={item.brand}
                            rating={item.rating}
                            title={item.title}
                            thumbnail={item.thumbnail}
                          />
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
