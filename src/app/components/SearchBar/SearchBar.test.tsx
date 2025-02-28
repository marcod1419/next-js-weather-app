import { fireEvent, render, screen } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders with initial value', () => {
    render(<SearchBar initialValue='Toronto' />)
    const input = screen.getByLabelText(/City name/i) as HTMLInputElement
    expect(input.value).toBe('Toronto')
  })

  it('updates value when user types', () => {
    render(<SearchBar initialValue='' />)
    const input = screen.getByLabelText(/City name/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Vancouver' } })
    expect(input.value).toBe('Vancouver')
  })

  it('shows an error if submitted with empty input', () => {
    render(<SearchBar initialValue='' />)
    const button = screen.getByRole('button', { name: /Get Weather/i })
    fireEvent.click(button)
    const error = screen.getByRole('alert')
    expect(error).toHaveTextContent('City cannot be empty')
  })
})
