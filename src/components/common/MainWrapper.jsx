import React from "react";

const MainWrapper = ({weather, weatherDesc, temperature, selectedUnit, selectedForecastItem, imageSelection}) => {
  return (
    <div className="main">
      <div className="main__title">
        {!temperature
          ? ""
          : `${temperature[selectedUnit].value}${
              selectedUnit !== "K" ? "°" : ""
            }`}
      </div>
      <div className="main__container-img">
        <img
          src={
            imageSelection(
              weather[selectedForecastItem].weather[0].description
            ).src
          }
          alt=""
        />
      </div>
      <p className="main__description">{!weatherDesc ? "" : weatherDesc}</p>
    </div>
  );
};

export default MainWrapper;
