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

  // Use the current weather endpoint from OpenWeatherMap (v2.5)
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`
  )
  if (!weatherRes.ok) throw new Error('Failed to fetch weather data')

  const data = await weatherRes.json()
  if (!data || !data.main || !data.weather || !data.weather[0]) {
    throw new Error('Invalid weather data')
  }

  return {
    city: data.name,
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon
  }
}
