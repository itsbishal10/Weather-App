import type { WeatherData, ForecastData } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getErrorMessage = (status: number): string => {
  switch (status) {
    case 401:
      return "Invalid API key. Please check your configuration.";
    case 404:
      return "City not found. Please check the spelling and try again.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    default:
      return "A network error occurred. Please try again later.";
  }
};

export const fetchWeather = async (
  city: string,
  unit: string
): Promise<WeatherData> => {
  let response: Response;

  try {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
    );
  } catch {
    throw new Error("Network error. Please check your internet connection.");
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status));
  }

  return response.json();
};

export const fetchForecast = async (
  city: string,
  unit: string
): Promise<{ list: ForecastData[] }> => {
  let response: Response;

  try {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
    );
  } catch {
    throw new Error("Network error. Please check your internet connection.");
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status));
  }

  return response.json();
};