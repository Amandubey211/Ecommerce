import { useEffect, useState } from "react";

const useSimilarCategories = (category) => {
  const [similarproducts, SetSimilarProducts] = useState([]);
  useEffect(() => {
    FetchCategory();
  }, [category]);

  const FetchCategory = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );

      const data = await res.json();

      if (data) {
        SetSimilarProducts(data);
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return similarproducts;
};

export default useSimilarCategories;
