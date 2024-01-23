import React from "react";
import UserCard from "../Components/UserCard";

const About = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2>contrubitors</h2>

      <div className="d-flex justify-content-center align-items-center gap-3 p-3 ">
        <UserCard userName="Amandubey211" />
        <UserCard userName="akshaymarch7" />
        {/* <UserCard userName="tanaypratap" /> */}
      </div>
    </div>
  );
};

export default About;
