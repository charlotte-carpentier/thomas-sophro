import EleventyFetch from '@11ty/eleventy-fetch';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Retrieves weather data for Saint-Florent
 * This module is imported directly in .eleventy.js as global data
 * @returns {Promise<Object>} Formatted weather data
 */
export default async function() {
  // Saint-Florent, Haute-Corse coordinates
  const lat = 42.6812;
  const lon = 9.3037;
  const apiKey = process.env.WEATHER_API_KEY;
  
  try {
    const weatherData = await EleventyFetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`,
      {
        duration: "1h", // Cache for one hour
        type: "json"
      }
    );
    
    return {
      temp: Math.round(weatherData.main.temp),
      feels_like: Math.round(weatherData.main.feels_like),
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      wind: {
        speed: Math.round(weatherData.wind.speed * 3.6), // Convert to km/h
        direction: weatherData.wind.deg
      },
      humidity: weatherData.main.humidity,
      sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      updated_at: new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  } catch (e) {
    console.error("Error retrieving weather data:", e);
    // Default values in case of error
    return {
      error: true,
      temp: 25,
      description: "Ensoleillé",
      feels_like: 28,
      wind: {
        speed: 10,
        direction: 180
      },
      humidity: 65,
      sunrise: "06:30",
      sunset: "20:45"
    };
  }
}