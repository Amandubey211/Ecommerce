import { useEffect, useState } from "react";

const useProductDetails = (PID) => {
  const [product, SetProductDetails] = useState(null);
  useEffect(() => {
    try {
      FetchProductsDetails();
    } catch (error) {
      console.log(error);
    }
  }, [PID]);
  const FetchProductsDetails = async () => {
    const res = await fetch(`https://dummyjson.com/products/${PID}`);
    const data = await res.json();
    if (data) {
      SetProductDetails(data);
    }
  };
  return product;
};

export default useProductDetails;
