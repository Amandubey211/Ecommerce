import { useEffect, useState } from "react";

const useAllProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    try {
      FetchProducts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  const FetchProducts = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products`);
      const data = await res.json();
      if (data) {
        setAllProducts(data?.products);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return allProducts;
};

export default useAllProduct;
