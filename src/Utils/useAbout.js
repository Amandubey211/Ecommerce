import { useEffect, useState } from "react";

const useAbout = (userName) => {
  const [about, SetAbout] = useState(null);
  useEffect(() => {
    FetchAbout();
  }, []);

  const FetchAbout = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${userName}`);
      const data = await res.json();
      if (data.id) {
        SetAbout(data);
      } 
    } catch (err) {
      console.log(err.message);
    }
  };
  return about;
};

export default useAbout;
