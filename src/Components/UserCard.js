import React from "react";
import useAbout from "../Utils/useAbout";

const UserCard = ({ userName }) => {
  const about = useAbout(userName);

  return (
    <div className="border rounded-3 p-3 ">
      <div className="d-flex justify-content-center ">
        <img
          className="rounded-3"
          style={{ height: "120px" }}
          src={about?.avatar_url}
        />
      </div>

      <hr />
      <h3> {about?.name}</h3>
      <h6> Address:{about?.location}</h6>
      <a target="_blank" href={about?.blog}>
        {" "}
        visit Portfolio
      </a>
    </div>
  );
};

export default UserCard;
