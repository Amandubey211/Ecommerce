import { useEffect, useState } from "react";

const useAllCategories = () => {
  const [AllCategories, SetAllCategories] = useState([]);
  useEffect(() => {
    FetchAllCategories();
  },[]);

  const FetchAllCategories = async () => {
    const res = await fetch('https://dummyjson.com/products/categories');
    const data = await res.json();
    if (data) {
      SetAllCategories(data);
    }
  };
  return AllCategories;
};

export default useAllCategories;
