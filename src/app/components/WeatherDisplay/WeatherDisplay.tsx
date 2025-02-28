'use client'

import Image from 'next/image'
import { WeatherData } from '../../lib/getWeatherData'
import styles from './WeatherDisplay.module.css'

interface WeatherDisplayProps {
  data: WeatherData
}

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  return (
    <div className={styles.result}>
      <h2 className={styles.cityName}>{data.city}</h2>
      <p className={styles.temperature}>{data.temp}°C</p>
      <p className={styles.description}>{data.description}</p>
      <Image
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        className={styles.icon}
        width={100}
        height={100}
      />
    </div>
  )
}
