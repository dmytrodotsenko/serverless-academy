const axios = require("axios");
const apiKey = "07885bc519d8374c7c24b36e9470b5f9";

const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?APPID=${apiKey}&units=metric&cnt=1&q=Lviv`;

const getWeatherForecast = () => {
  return axios
    .get(baseUrl)
    .then((forecasts) => {
      return forecasts.data;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = { getWeatherForecast };
