import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Weather App',
  description: 'A Next.js weather app using OpenWeather One Call API 3.0'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
