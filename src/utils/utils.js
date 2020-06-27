// Importing icons
import sun from "../assets/images/sun.svg";
import cloudSun from "../assets/images/cloud-sun.svg";
import cloudRain from "../assets/images/cloud-rain.svg";
import cloudStorm from "../assets/images/cloud-storm.svg";
import haze from "../assets/images/haze.svg";
import snow from "../assets/images/snow.svg";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const numberForecastDays = 4;

export const getTemperature = (temperature) => {
  return {
    C: { unit: "C", value: convertTemp(temperature, "C") },
    F: { unit: "F", value: convertTemp(temperature, "F") },
    K: { unit: "K", value: convertTemp(temperature) },
  };
};

export const convertTemp = (temperature, unit = "K") => {
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

export const getForecastDays = () => {
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

export const imageSelection = (weatherDesc) => {
  const regex1 = /clear/;
  const regex2 = /cloud/;
  const regex3 = /rain/;
  const regex4 = /storm/;
  const regex5 = /haze/;
  const regex6 = /snow/;

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
    src = cloudStorm;
    background = "linear-gradient(180deg, #394146 0%, #73838B 100%)";
    activeBackground = "#52585B";
  } else if(weatherDesc.match(regex5)){
    src = haze;
    background = "linear-gradient(180deg, #98A6AE 0%, #CECECE 100%)";
    activeBackground = "#798892";
  } else if(weatherDesc.match(regex6)){
    src = snow;
    background = "linear-gradient(180deg, #CCCCCC 0%, rgba(214, 224, 231, 0.6) 100%)";
    activeBackground = "#B1B1B1";
  }

  return { src, background, activeBackground };
};