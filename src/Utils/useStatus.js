import { useEffect, useState } from "react";

const useStatus = () => {
  const [status, SetStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      SetStatus(false);
    });
    window.addEventListener("online", () => {
      SetStatus(true);
    });
  }, []);
  return status;
};

export default useStatus;
