import React from "react";

const MainUnits = ({units, selectedUnit, onClick, activeBackground}) => {
  return (
    <ul className="units__menu">
      {units.map((u) => (
        <li key={u} className="units__item">
          <button
            onClick={() => onClick(u)}
            className={
              u === selectedUnit
                ? "units__item__btn--active"
                : "units__item__btn"
            }
            style={u !== selectedUnit ? {background: activeBackground} : null}
          >
            {u}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MainUnits;
