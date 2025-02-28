import { render, screen } from '@testing-library/react'
import CitySelection from './CitySelection'
import { cities } from '../../../../config'

describe('CitySelection', () => {
  it('renders the correct number of city links', () => {
    render(<CitySelection />)
    const cityLinks = screen.getAllByRole('link')
    expect(cityLinks.length).toBe(cities.length)
  })

  it('each link has the correct text and aria-label', () => {
    render(<CitySelection />)
    cities.forEach((city) => {
      const link = screen.getByRole('link', {
        name: `View weather for ${city.displayName}`
      })
      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent(city.displayName)
    })
  })
})
