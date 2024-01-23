import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const err = useRouteError();
  return (
    <div>
      <div className="d-flex justify-content-center flex-column  align-items-center p-5">
        <h2>Opps, Something Went Wrong!</h2>
        <h4>{err.status}:{err.statusText}</h4>
      </div>
    </div>
  );
};

export default ErrorPage;
