import {
  WiCloud,
  WiDaySunny,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

import type { WeatherData } from "../types/weather";

type WeatherCardProps = {
  weather: WeatherData;
  unit: string;
};

function WeatherCard({ weather, unit }: WeatherCardProps) {
  const condition = weather.weather[0].main;

  const temperatureUnit = unit === "metric" ? "°C" : "°F";

  const getWeatherIcon = () => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={90} />;

      case "Clouds":
        return <WiCloud size={90} />;

      case "Rain":
      case "Drizzle":
        return <WiRain size={90} />;

      case "Thunderstorm":
        return <WiThunderstorm size={90} />;

      case "Snow":
        return <WiSnow size={90} />;

      case "Mist":
      case "Fog":
      case "Haze":
        return <WiFog size={90} />;

      default:
        return <WiCloud size={90} />;
    }
  };

  return (
    <div
      className="
        mt-8
        bg-slate-800
        p-6
        rounded-2xl
        w-full
        max-w-md
        text-white
        shadow-lg
        overflow-hidden
      "
    >
      <div className="flex flex-col items-center">
        {getWeatherIcon()}

        <h2 className="text-3xl font-bold mt-2">{weather.name}</h2>

        <p className="text-6xl font-bold mt-4">
          {Math.round(weather.main.temp)}
          {temperatureUnit}
        </p>

        <p className="text-xl mt-2">{condition}</p>

        <p className="text-slate-300 mt-2">
          Feels like {Math.round(weather.main.feels_like)}
          {temperatureUnit}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-slate-700 p-4 rounded-xl">
          <p className="text-slate-300">Humidity</p>
          <p className="text-2xl font-bold">{weather.main.humidity}%</p>
        </div>

        <div className="bg-slate-700 p-4 rounded-xl">
          <p className="text-slate-300">Wind Speed</p>
          <p className="text-2xl font-bold">
            {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}
          </p>
        </div>

        <div className="bg-slate-700 p-4 rounded-xl">
          <p className="text-slate-300">Pressure</p>
          <p className="text-2xl font-bold">{weather.main.pressure}</p>
        </div>

        <div className="bg-slate-700 p-4 rounded-xl">
          <p className="text-slate-300">Clouds</p>
          <p className="text-2xl font-bold">{weather.clouds.all}%</p>
        </div>

        <div className="bg-slate-700 p-4 rounded-xl col-span-2">
          <p className="text-slate-300">Visibility</p>
          <p className="text-2xl font-bold">{weather.visibility / 1000} km</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
