import {
  WiCloud,
  WiDaySunny,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

import type { ForecastData } from "../types/weather";

type ForecastCardProps = {
  day: ForecastData;
  unit: string;
};

function ForecastCard({ day, unit }: ForecastCardProps) {
  const temperatureUnit = unit === "metric" ? "°C" : "°F";
  const condition = day.weather[0].main;

  const getWeatherIcon = () => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={48} className="text-yellow-400" />;
      case "Clouds":
        return <WiCloud size={48} className="text-slate-300" />;
      case "Rain":
      case "Drizzle":
        return <WiRain size={48} className="text-blue-400" />;
      case "Thunderstorm":
        return <WiThunderstorm size={48} className="text-purple-400" />;
      case "Snow":
        return <WiSnow size={48} className="text-sky-200" />;
      case "Mist":
      case "Fog":
      case "Haze":
        return <WiFog size={48} className="text-slate-400" />;
      default:
        return <WiCloud size={48} className="text-slate-300" />;
    }
  };

  const date = new Date(day.dt_txt);

  return (
    <div
      className="
        bg-slate-700/60
        border
        border-slate-600/40
        min-w-32.5
        p-4
        rounded-2xl
        text-white
        flex
        flex-col
        items-center
        gap-1
        shrink-0
      "
    >
      <p className="font-semibold text-slate-200 text-sm">
        {date.toLocaleDateString("en-US", { weekday: "short" })}
      </p>

      <p className="text-xs text-slate-400">
        {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </p>

      <div className="my-1">{getWeatherIcon()}</div>

      <p className="text-xs text-slate-300 text-center">{condition}</p>

      <div className="flex gap-2 mt-1 text-sm font-semibold">
        <span className="text-orange-300">
          {Math.round(day.main.temp_max)}
          {temperatureUnit}
        </span>
        <span className="text-slate-400">/</span>
        <span className="text-sky-300">
          {Math.round(day.main.temp_min)}
          {temperatureUnit}
        </span>
      </div>
    </div>
  );
}

export default ForecastCard;
