import { Metadata } from 'next'

import getWeatherData, { WeatherData } from './lib/getWeatherData'
import WeatherDisplay from './components/WeatherDisplay'
import CitySelection from './components/CitySelection'
import SearchBar from './components/SearchBar'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A Next.js weather app using OpenWeather current weather API'
}

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function HomePage({ searchParams }: Props) {
  const currSearchParams = await searchParams
  const city = currSearchParams.city
  let weatherData: WeatherData | null = null
  let error: string | null = null

  if (city) {
    try {
      weatherData = await getWeatherData(city)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error = err.message
      } else {
        error = 'Failed to fetch weather data'
      }
    }
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>
      <CitySelection />
      <SearchBar initialValue={city || ''} />
      {error && (
        <p
          className={styles.error}
          role='alert'
        >
          ⚠️ {error}
        </p>
      )}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </main>
  )
}
