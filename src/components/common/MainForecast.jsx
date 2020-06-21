import React from "react";

const MainForecast = ({weather, forecastDays, selectedForecastItem, selectedUnit, activeBackground, onClick, imageSelection, convertTemp}) => {
  return (
    <div className="forecast">
      <ul className="forecast__menu">
        {forecastDays.map((day, index) => (
          <li
            key={index}
            onClick={() => onClick(index)}
            className={
              index === selectedForecastItem
                ? "forecast__item forecast__item--active"
                : "forecast__item"
            }
            style={
              index === selectedForecastItem
                ? { background: activeBackground }
                : null
            }
          >
            <p>{day}</p>
            <img
              className="forecast__item__img"
              src={imageSelection(weather[index].weather[0].description).src}
              alt="sun"
            />
            <p className="forecast__description">
              {weather.length
                ? index !== 0
                  ? convertTemp(weather[index].temp.day, selectedUnit)
                  : convertTemp(weather[0].main.temp, selectedUnit)
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainForecast;
