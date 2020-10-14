import React from "react";

const MainWrapper = ({weather, weatherDesc, temperature, selectedUnit, selectedForecastItem, imageSelection}) => {
  return (
    <div className="main">
      <h1 className="main__title">
        {!temperature
          ? ""
          : `${temperature[selectedUnit].value}${
              selectedUnit !== "K" ? "°" : ""
            }`}
      </h1>
      <div className="main__container-info">
        <img
          src={
            imageSelection(
              weather[selectedForecastItem].weather[0].description
            ).src
          }
          alt=""
        />
        <p className="main__description">{!weatherDesc ? "" : weatherDesc}</p>
      </div>
    </div>
  );
};

export default MainWrapper;
