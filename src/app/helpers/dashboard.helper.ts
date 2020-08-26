import { CityI, ForecastI, graphData, SeriesItemI } from "../models/wheather.models";
import { months } from "../other/variables";

export function getArrayIndexes(forecast: ForecastI): number[] {
  return forecast.daily.map((_, index) => index + 1);
}

export function getTemperature(forecast: ForecastI): graphData[] {
  return forecast.daily.map(item => [item.dt, item.temp.day]);
}

export function getForecastProperty(forecast: ForecastI, property: string): graphData[] {
  return forecast.daily.map(item => [item.dt, item[property]]);
}

export function getChartData(forecast: ForecastI, isTemperature, isPressure, isHumidity, color?): SeriesItemI[] {
  const data: SeriesItemI[] = [];
  if (!color) color = '#4b4fce';
  if (isTemperature) data.push({ color, name: 'Temperature', data: getTemperature(forecast) });
  if (isPressure) data.push({ color, name: 'Pressure', data: getForecastProperty(forecast, 'pressure') });
  if (isHumidity) data.push({ color, name: 'Humidity', data: getForecastProperty(forecast, 'humidity') });
  return [ ...data ];
}

export function findCityIndexByName(cities: CityI[], currentCityName: string): number {
  return cities.indexOf(cities.find(item => item.cityName === currentCityName))
}

export function getForecastByDays(forecast: ForecastI, daysCount: number): ForecastI {
  return { ...forecast, daily: forecast.daily.slice(0, daysCount ? daysCount : forecast.daily.length) }
}

export function getDateByTimestamp(timestamp: number): string {
  const fullDate = new Date(timestamp * 1000);
  return fullDate.getDate() + ' ' + months[fullDate.getMonth()]
}

export function getTypeFromArray(type: string, array: string[]): string {
  return array.find(item => item === type);
}

export function createNewSeriesItem(sensor: string, color: string, forecast: ForecastI): SeriesItemI {
  if (sensor === 'showTemperature') {
    return { color, name: 'Temperature', data: getTemperature(forecast) }
  } else  if (sensor === 'showPressure') {
    return { color, name: 'Pressure', data: getForecastProperty(forecast, 'pressure') }
  } else {
    return { color, name: 'Humidity', data: getForecastProperty(forecast, 'humidity') }
  }
}
