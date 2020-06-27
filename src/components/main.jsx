import React, { Component } from "react";
import axios from "axios";

// Importing all from config folder
import {
  weatherApiUrl,
  weatherForecastApiUrl,
  weatherApiKey,
  geocodingApiUrl,
  geocodingApiKey,
} from "../config/config.json";

// Importing Joi, validation library
import Joi from "joi";

import "../components/styles/main.css";

// Importing ToastContainer, toast for notifications and/or errors
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing components from common folder
import MainForm from "./common/MainForm";
import Button from "./common/Button";
import MainUnits from "./common/MainUnits";
import MainWrapper from "./common/MainWrapper";
import MainForecast from "./common/MainForecast";

import Dropdown from "./Dropdown";

// Importing functions from utils.js
import {
  getTemperature,
  convertTemp,
  getForecastDays,
  imageSelection,
} from "../utils/utils";

// URL configuring: 1.weather, 2.gecoding (coordinates), 3.forecast weather
let weatherUrl = weatherApiUrl + weatherApiKey;
let geocodingUrl = geocodingApiUrl + geocodingApiKey;
let forecastUrl = weatherForecastApiUrl + weatherApiKey;

const numberForecastDays = 4;

class Main extends Component {
  state = {
    location: "",
    weather: [],
    style: {
      background:
        "linear-gradient(180.03deg, #FD8F0E 0.01%, rgba(255, 191, 117, 0.8) 110.02%)",
      activeBackground: "#ff8900",
    },
    units: ["C", "F", "K"],
    selectedUnit: "C",
    selectedForecastItem: 0,
    favorites: [],
  };

  schema = Joi.object().keys({
    location: Joi.string().required(),
  });

  validate = () => {
    const { location } = this.state;
    const options = { abortEarly: false };
    const { error } = Joi.validate({ location }, this.schema, options);
    return error ? error.details : null;
  };

  
  handleChange = ({ currentTarget: input }) => {
    this.setState({ location: input.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { location } = this.state;

    // Validation with JOI
    const error = this.validate();

    if (error) {
      for (let err of error) toast.error(err.message);
    }

    // Weather for the current day
    // let { data: weather } = axios.get(`${weatherUrl}&q=${location}`).then(data => data);
    let { data: weather } = await axios.get(`${weatherUrl}&q=${location}`);

    const { data: locationData } = await axios.get(
      `${geocodingUrl}&location=${location}`
    );

    // Getting the coords using geocoding
    const coords = locationData.results[0].locations[0].latLng;

    let { data: weatherForecastData } = await axios.get(
      `${forecastUrl}&lat=${coords.lat}&lon=${coords.lng}`
    );

    // Taking only the first 5 days
    weatherForecastData.daily.splice(numberForecastDays);

    weatherForecastData.daily.unshift(weather);

    let temperature = weather.main.temp;

    this.setState({ weather: weatherForecastData.daily });

    this.setState({
      weatherDesc: weather.weather[0].main,
      temperature: {
        C: { unit: "C", value: convertTemp(temperature, "C") },
        F: { unit: "F", value: convertTemp(temperature, "F") },
        K: { unit: "K", value: convertTemp(temperature) },
      },
    });
  };

  addToFavorites = (element) => {
    const { favorites } = this.state;

    if (favorites.find((el) => el === element)) return null;

    this.setState({ favorites: [...favorites, element] });
  };

  render() {
    const {
      location,
      favorites,
      units,
      selectedUnit,
      temperature,
      weather,
      weatherDesc,
      selectedForecastItem,
    } = this.state;

    const forecastDays = getForecastDays();

    let { background, activeBackground } = this.state.style;

    if (weather.length !== 0) {
      background = imageSelection(
        weather[selectedForecastItem].weather[0].description
      ).background;
      activeBackground = imageSelection(
        weather[selectedForecastItem].weather[0].description
      ).activeBackground;
    }

    return (
      <body style={{ background }}>
        <div className="wrapper">
          <MainForm
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            addToFavorites={this.addToFavorites}
            favorites={favorites}
            location={location}
            onClick={(location) => this.setState({ location })}
          />

          {weather.length !== 0 && (
            <React.Fragment>
              <MainUnits
                units={units}
                selectedUnit={selectedUnit}
                onClick={(u) => this.setState({ selectedUnit: u })}
                activeBackground={activeBackground}
              />

              <div className="main__wrapper">
                <MainWrapper
                  weather={weather}
                  weatherDesc={weatherDesc}
                  temperature={temperature}
                  selectedUnit={selectedUnit}
                  selectedForecastItem={selectedForecastItem}
                  imageSelection={imageSelection}
                />

                <MainForecast
                  weather={weather}
                  forecastDays={forecastDays}
                  selectedForecastItem={selectedForecastItem}
                  selectedUnit={selectedUnit}
                  activeBackground={activeBackground}
                  onClick={(index) =>
                    this.setState({
                      selectedForecastItem: index,
                      weatherDesc: weather[index].weather[0].description,
                      temperature: getTemperature(
                        index === 0
                          ? weather[index].main.temp
                          : weather[index].temp.day
                      ),
                    })
                  }
                  imageSelection={imageSelection}
                  convertTemp={convertTemp}
                />
              </div>
            </React.Fragment>
          )}

          <ToastContainer />
        </div>
      </body>
    );
  }
}

export default Main;
