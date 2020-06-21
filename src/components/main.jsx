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

// Importing font-awesome and the plus icon
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Importing icons
import sun from "../assets/images/sun.svg";
import cloudSun from "../assets/images/cloud-sun.svg";
import cloudRain from "../assets/images/cloud-rain.svg";

// Importing components from common folder
import MainForm from "./common/MainForm";
import MainButton from "./common/MainButton";
import MainUnits from "./common/MainUnits";
import MainWrapper from "./common/MainWrapper";
import MainForecast from "./common/MainForecast";

// URL configuring: 1.weather, 2.gecoding (coordinates), 3.forecast weather
let weatherUrl = weatherApiUrl + weatherApiKey;
let geocodingUrl = geocodingApiUrl + geocodingApiKey;
let forecastUrl = weatherForecastApiUrl + weatherApiKey;

const numberForecastDays = 4;

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

    const error = this.validate();

    if (error) {
      for (let err of error) toast.error(err.message);
    }

    let { data: weather } = await axios.get(`${weatherUrl}&q=${location}`);

    const { data: locationData } = await axios.get(
      `${geocodingUrl}&location=${location}`
    );

    const coords = locationData.results[0].locations[0].latLng;

    let { data: weatherForecastData } = await axios.get(
      `${forecastUrl}&lat=${coords.lat}&lon=${coords.lng}`
    );

    weatherForecastData.daily.splice(numberForecastDays);

    weatherForecastData.daily.unshift(weather);

    let temperature = weather.main.temp;

    this.setState({ weather: weatherForecastData.daily });

    this.setState({
      weatherDesc: weather.weather[0].main,
      temperature: {
        C: { unit: "C", value: this.convertTemp(temperature, "C") },
        F: { unit: "F", value: this.convertTemp(temperature, "F") },
        K: { unit: "K", value: this.convertTemp(temperature) },
      },
    });
  };

  getTemperature = (temperature) => {
    return {
      C: { unit: "C", value: this.convertTemp(temperature, "C") },
      F: { unit: "F", value: this.convertTemp(temperature, "F") },
      K: { unit: "K", value: this.convertTemp(temperature) },
    };
  };

  convertTemp = (temperature, unit = "K") => {
    temperature = Math.round(temperature);
    switch (unit) {
      case "C":
        temperature = Math.round(temperature - 273.15);
        break;
      case "F":
        temperature = Math.round((temperature - 273.15) * 1.8 + 32);
        break;
      default:
        break;
    }
    return temperature;
  };

  getForecastDays = () => {
    const now = new Date(Date.now());
    const startDay = now.toDateString().split(" ")[0];

    let index = daysOfWeek.indexOf(startDay);

    const days = [];
    let count = 0;

    while (count < numberForecastDays + 1) {
      if (index > daysOfWeek.length - 1) index = 0;
      days.push(daysOfWeek[index]);
      index++;
      count++;
    }

    return days;
  };

  imageSelection = (weatherDesc) => {
    const regex1 = /clear/;
    const regex2 = /cloud/;
    const regex3 = /rain/;
    const regex4 = /storm/;

    let src, background, activeBackground;

    if (weatherDesc.match(regex1)) {
      src = sun;
      background =
        "linear-gradient(180.03deg, #FD8F0E 0.01%, rgba(255, 191, 117, 0.8) 110.02%";
      activeBackground = "#ff8900";
    } else if (weatherDesc.match(regex2)) {
      src = cloudSun;
      background = "linear-gradient(180deg, #0081C9 0%, #94D9FF 100%)";
      activeBackground = "#2397D8";
    } else if (weatherDesc.match(regex3)) {
      src = cloudRain;
      background = "linear-gradient(180deg, #3D515E 0%, #769EB3 100%)";
      activeBackground = "#3D515E";
    } else if (weatherDesc.match(regex4)) {
      src = cloudRain;
      background = "linear-gradient(180deg, #3D515E 0%, #769EB3 100%)";
      activeBackground = "#3D515E";
    }

    return { src, background, activeBackground };
  };

  render() {
    const {
      units,
      selectedUnit,
      temperature,
      weather,
      weatherDesc,
      selectedForecastItem,
    } = this.state;

    const forecastDays = this.getForecastDays();

    let { background, activeBackground } = this.state.style;

    if (weather.length !== 0) {
      background = this.imageSelection(
        weather[selectedForecastItem].weather[0].description
      ).background;
      activeBackground = this.imageSelection(
        weather[selectedForecastItem].weather[0].description
      ).activeBackground;
    }

    return (
      <body style={{ background }}>
        <div className="wrapper">
          <MainForm onChange={this.handleChange} onSubmit={this.handleSubmit} />

          <MainButton icon={faPlus}/>

          <MainUnits
            units={units}
            selectedUnit={selectedUnit}
            onClick={(u) => this.setState({ selectedUnit: u })}
            activeBackground={activeBackground}
          />

          {weather.length !== 0 ? (
            <div className="main__wrapper">
              <MainWrapper
                weather={weather}
                weatherDesc={weatherDesc}
                temperature={temperature}
                selectedUnit={selectedUnit}
                selectedForecastItem={selectedForecastItem}
                imageSelection={this.imageSelection}
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
                    temperature: this.getTemperature(
                      index === 0
                        ? weather[index].main.temp
                        : weather[index].temp.day
                    ),
                  })
                }
                imageSelection={this.imageSelection}
                convertTemp={this.convertTemp}
              />
            </div>
          ) : null}

          <ToastContainer />
        </div>
      </body>
    );
  }
}

export default Main;
