export interface WeatherData {

  name: string;

  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };

  weather: {
    main: string;
  }[];

  wind: {
    speed: number;
  };

  clouds: {
    all: number;
  };

  visibility: number;
}

export interface ForecastData {

  dt_txt: string;

  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  }

  weather: {
    main: string;
  }[];
}