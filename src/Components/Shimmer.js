import React from "react";

const Shimmer = ({height,width}) => {
  return (
    <div
      style={{ height:height, width:width,backgroundColor:"#c0c0c0" }}
      className=" rounded-3"
    ></div>
  );
};

export default Shimmer;
