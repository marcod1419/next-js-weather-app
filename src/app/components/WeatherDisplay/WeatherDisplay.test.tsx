import { render, screen } from '@testing-library/react'
import WeatherDisplay from './WeatherDisplay'
import { WeatherData } from '../../lib/getWeatherData'

const mockWeatherData: WeatherData = {
  city: 'London',
  temp: 15,
  description: 'light rain',
  icon: '10d'
}

describe('WeatherDisplay', () => {
  it('renders weather data correctly', () => {
    render(<WeatherDisplay data={mockWeatherData} />)
    expect(screen.getByText(/London/i)).toBeInTheDocument()
    expect(screen.getByText(/15°C/i)).toBeInTheDocument()
    expect(screen.getByText(/light rain/i)).toBeInTheDocument()

    const image = screen.getByAltText(/light rain/i)
    expect(image).toBeInTheDocument()
  })
})
