import React, { useState } from "react";
import useAllCategories from "../Utils/useAllCategories";
import CategoryCard from "../Components/CategoryCard";
import Shimmer from "../Components/Shimmer";
import toast from "react-hot-toast";

const Category = () => {
  const AllCategory = useAllCategories();
  const [categoryIndex, SetCategoryIndex] = useState(null);
  const [filterCategory, SetFilterCAtegory] = useState([]);
  const [searchedCategory, SetSearchedCategory] = useState("");

  if (AllCategory.length === 0) {
    return (
      <div className="p-5 d-flex align-items-center justify-content-center flex-column gap-2">
        <Shimmer height="60px" width="600px" />
        <Shimmer height="60px" width="600px" />{" "}
        <Shimmer height="60px" width="600px" />{" "}
        <Shimmer height="60px" width="600px" />{" "}
        <Shimmer height="60px" width="600px" />{" "}
        <Shimmer height="60px" width="600px" />
      </div>
    );
  }
  const HandleCategory = (e) => {
    e.preventDefault();
    if (searchedCategory) {
      const FilterCategories = AllCategory?.filter((item) => {
        return item.toLowerCase().includes(searchedCategory.toLowerCase());
      });

      if (FilterCategories.length > 0) {
        SetFilterCAtegory(FilterCategories);
        toast.success(`${FilterCategories?.length} category found`)
      } else {
        toast.error("No category Found ");
        SetFilterCAtegory([]);
      }
    } else {
      toast.error("please enter some text first");
    }
  };
  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between px-5 my-2  gap-3">
        <div className="d-flex align-items-center gap-2">
          <form
            onSubmit={HandleCategory}
            className="d-flex align-items-center gap-1"
          >
            <input
              type="text"
              className="border-1 ps-3 p-1 rounded-1 "
              placeholder="search category"
              value={searchedCategory}
              onChange={(e) => SetSearchedCategory(e.target.value)}
            />
            <button
              className="btn btn-success"
              type="submit"
              onClick={HandleCategory}
            >
              search
            </button>
          </form>
          <div
            className="btn btn-outline-warning"
            onClick={() => {
              SetFilterCAtegory([]);
            }}
          >
            All Category
          </div>{" "}
        </div>
        <div className="d-flex justify-content-center gap-2">
          <div
            className="btn btn-warning"
            onClick={() => {
              const mensCategories = AllCategory.filter((item) => {
                return item.toLowerCase().startsWith("mens");
              });
              SetFilterCAtegory(mensCategories);
              SetCategoryIndex(null);
            }}
          >
            Mens
          </div>
          <div
            className="btn btn-warning "
            onClick={() => {
              const mensCategories = AllCategory.filter((item) => {
                return item.toLowerCase().startsWith("women");
              });
              SetFilterCAtegory(mensCategories);
              SetCategoryIndex(null);
            }}
          >
            Womens
          </div>
          <div
            className="btn btn-warning"
            onClick={() => {
              const mensCategories = AllCategory.filter((item) => {
                return item.toLowerCase().startsWith("smart");
              });
              SetFilterCAtegory(mensCategories);
              SetCategoryIndex(null);
            }}
          >
            Smartphones
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        <span className=""> Total Category ({AllCategory?.length})</span>
      </div>
      <div className="d-flex mt-2 pt-2 justify-content-start align-items-center flex-column gap-2">
        {filterCategory?.length > 0 ? (
          <>
            {" "}
            <div className="d-flex mt-2 pt-2 justify-content-start align-items-center flex-column gap-2">
              <b>Filtered Items</b>
              {filterCategory?.map((item, index) => {
                return (
                  <CategoryCard
                    key={index}
                    item={item}
                    showlist={index === categoryIndex ? true : false}
                    SetCategoryIndex={() => {
                      SetCategoryIndex(index);
                    }}
                    closeIndex={() => {
                      SetCategoryIndex(null);
                    }}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            {" "}
            {AllCategory?.map((item, index) => {
              return (
                <CategoryCard
                  key={index}
                  item={item}
                  showlist={index === categoryIndex ? true : false}
                  SetCategoryIndex={() => {
                    SetCategoryIndex(index);
                  }}
                  closeIndex={() => {
                    SetCategoryIndex(null);
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      <div></div>
    </div>
  );
};

export default Category;
