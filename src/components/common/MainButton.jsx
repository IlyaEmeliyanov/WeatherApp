import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainButton = ({icon}) => {
  return (
    <button className="form__btn-plus">
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default MainButton;
