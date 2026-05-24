import { useEffect, useRef, useState } from "react";

import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import type { WeatherData, ForecastData } from "./types/weather";
import { fetchWeather, fetchForecast } from "./services/weatherApi";
import useDebounce from "./hooks/useDebounce";

// Get one forecast item for each day
function getDailyForecasts(list: ForecastData[]): ForecastData[] {
  const seen = new Set<string>();
  const daily: ForecastData[] = [];

  for (const entry of list) {
    const date = entry.dt_txt.split(" ")[0];
    if (!seen.has(date)) {
      seen.add(date);
      daily.push(entry);
    }
    if (daily.length === 5) break;
  }

  return daily;
}

function App() {
  const [city, setCity] = useState("Jorhat");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("weatherHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const debouncedCity = useDebounce(city, 500);

  // Helps ignore old API responses
  const requestId = useRef(0);

  useEffect(() => {
    // Remove extra spaces from input
    const trimmed = debouncedCity.trim();

    // Don't search for very short input
    if (trimmed.length < 2) return;

    const currentId = ++requestId.current;

    const getWeather = async () => {
      try {
        setLoading(true);
        setError("");
        setWeather(null);

        const [weatherData, forecastData] = await Promise.all([
          fetchWeather(trimmed, unit),
          fetchForecast(trimmed, unit),
        ]);

        // Ignore old request results
        if (currentId !== requestId.current) return;

        setWeather(weatherData);
        setForecast(getDailyForecasts(forecastData.list));

        setHistory((prev) => {
          const updated = [
            trimmed,
            ...prev.filter(
              (item) => item.toLowerCase() !== trimmed.toLowerCase(),
            ),
          ].slice(0, 5);

          localStorage.setItem("weatherHistory", JSON.stringify(updated));
          return updated;
        });
      } catch (err) {
        if (currentId !== requestId.current) return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        if (currentId === requestId.current) {
          setLoading(false);
        }
      }
    };

    getWeather();
  }, [debouncedCity, unit]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
        Weather App
      </h1>

      <SearchBar city={city} setCity={setCity} loading={loading} />

      <SearchHistory history={history} onSelect={setCity} />

      <button
        onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
        disabled={loading}
        className="
          mt-4
          bg-sky-500
          hover:bg-sky-600
          disabled:opacity-50
          disabled:cursor-not-allowed
          text-white
          px-6
          py-2
          rounded-xl
          transition
        "
      >
        Switch to {unit === "metric" ? "°F" : "°C"}
      </button>

      {loading && <LoadingSpinner />}

      {error && !loading && <ErrorMessage message={error} />}

      {weather && !loading && <WeatherCard weather={weather} unit={unit} />}

      {!loading && forecast.length > 0 && (
        <div className="flex gap-4 overflow-x-auto mt-8 w-full max-w-5xl pb-4 justify-center">
          {forecast.map((day) => (
            <ForecastCard key={day.dt_txt} day={day} unit={unit} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
