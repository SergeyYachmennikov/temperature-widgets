import {CityI, ForecastI, SeriesItemI} from "../models/wheather.models";

export function getArrayIndexes(forecast: ForecastI): number[] {
  return forecast.daily.map((_, index) => index + 1);
}

export function toCapitalizeCase(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}

export function getTemperature(forecast: ForecastI): number[] {
  return forecast.daily.map(item => item.temp.day);
}

export function getForecastProperty(forecast: ForecastI, property: string): number[] {
  return forecast.daily.map(item => item[property]);
}

export function getChartData(forecast: ForecastI, isTemperature, isPressure, isHumidity): SeriesItemI[] {
  const data: SeriesItemI[] = [];
  if (isTemperature) data.push({ name: 'Temperature', data: getTemperature(forecast) });
  if (isPressure) data.push({ name: 'Pressure', data: getForecastProperty(forecast, 'pressure') });
  if (isHumidity) data.push({ name: 'Humidity', data: getForecastProperty(forecast, 'humidity') });
  return data;
}

export function findCityIndexByName(cities: CityI[], currentCityName: string): number {
  return cities.indexOf(cities.find(item => item.cityName === currentCityName))
}

export function getForecastByDays(forecast: ForecastI, daysCount: number): ForecastI {
  return { ...forecast, daily: forecast.daily.slice(0, daysCount ? daysCount : forecast.daily.length) }
}
