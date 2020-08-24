export interface CityI {
  cityName: string,
  latitude: number,
  longitude: number
}

export interface MinutelyWeatherI {
  dt: number,
  precipitation: number
}

export interface WeatherI {
  id: number,
  main: string,
  description: string,
  icon: string
}

export interface HourlyWeatherI {
  dt: number,
  temp: number,
  feels_like: number,
  pressure: number,
  humidity: number,
  dew_point: number,
  clouds: number,
  visibility: number,
  wind_speed: number,
  wind_deg: number,
  weather: WeatherI[],
  pop: number
}

export interface DailyWeatherI {
  dt: number,
  sunrise: number,
  sunset: number,
  temp: {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
  },
  feels_like: {
    day: number
    night: number,
    eve: number,
    morn: number
  },
  pressure: number,
  humidity: number,
  dew_point: number,
  wind_speed: number,
  wind_deg: number,
  weather: WeatherI[],
  clouds: number,
  pop: number,
  rain: number,
  uvi: number
}

export interface ForecastI {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: WeatherI[],
  },
  minutely?: MinutelyWeatherI[],
  hourly?: HourlyWeatherI[],
  daily?: DailyWeatherI[]
}

export type graphData = [number, number];

export interface SeriesItemI {
  name: string,
  data: graphData[],
  color?: string
}
