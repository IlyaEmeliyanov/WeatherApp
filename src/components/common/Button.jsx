import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainButton = ({icon, text, onClick, style, type}) => {
  return (
    <React.Fragment>
      <p className="form__btn-text">{text ? text : null}</p>
      <button style={style} className="form__btn" type={type} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </React.Fragment>
  );
};

export default MainButton;
