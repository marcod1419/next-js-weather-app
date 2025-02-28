export interface WeatherData {
  city: string
  temp: number
  description: string
  icon: string
}

export default async function getWeatherData(
  city: string
): Promise<WeatherData> {
  const API_KEY = process.env.OPENWEATHER_API_KEY
  if (!API_KEY) throw new Error('API key not configured')

  // --- Step 1: Convert city name to coordinates using the Geocoding API
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${API_KEY}`
  )
  if (!geoRes.ok) throw new Error('Failed to fetch geocode data')
  const geoData = await geoRes.json()
  if (!geoData.length) throw new Error('City not found')
  const { lat, lon, name } = geoData[0]

  // --- Step 2: Fetch current weather data using One Call API 3.0
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,hourly,daily,alerts`
  )
  if (!weatherRes.ok) throw new Error('Failed to fetch weather data')
  const weatherData = await weatherRes.json()
  if (!weatherData || !weatherData.current)
    throw new Error('Invalid weather data')

  return {
    city: name,
    temp: weatherData.current.temp,
    description: weatherData.current.weather[0].description,
    icon: weatherData.current.weather[0].icon
  }
}
