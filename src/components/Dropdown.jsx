import React, { useState } from "react";

import {
  faCaretDown,
  faCaretUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import Button from "./common/Button";
import "./styles/dropdown.css";

const Dropwdown = ({ location, addToFavorites, favorites, onClick }) => {
  const [open, setOpen] = useState(false);

  const dropdownBtn = {
    position: "absolute",
    top: "25px",
    right: "15px",
  };

  const addToFavoritesBtn = {
    color: "var(--text-color)",
  };

  return (
    <React.Fragment>
      <Button
        type={"button"}
        style={dropdownBtn}
        onClick={() => setOpen(!open)}
        icon={open ? faCaretUp : faCaretDown}
      />
      {open && (
        <div className="dropdown">
          <ul className="dropdown__menu">
            <li className="dropdown__item">
              <Button
                type={"button"}
                text={"Add To Favorites"}
                style={addToFavoritesBtn}
                onClick={location ? () => addToFavorites(location) : null}
                icon={faPlus}
              />
            </li>
            {favorites.length !== 0
              ? favorites.map((el) => (
                  <li key={el} className="dropdown__item">
                    <button
                      type="button"
                      className="dropdown__btn"
                      onClick={() => onClick(el)}
                    >
                      {el}
                    </button>
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default Dropwdown;
