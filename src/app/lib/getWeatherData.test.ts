import getWeatherData from './getWeatherData'

describe('getWeatherData', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    // Set a dummy API key for testing purposes.
    process.env.OPENWEATHER_API_KEY = 'test-api-key'
  })

  it('should return weather data for a valid city', async () => {
    const mockWeatherResponse = {
      name: 'London',
      main: { temp: 15 },
      weather: [{ description: 'light rain', icon: '10d' }]
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockWeatherResponse
    })

    const data = await getWeatherData('London')
    expect(data).toEqual({
      city: 'London',
      temp: 15,
      description: 'light rain',
      icon: '10d'
    })
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.openweathermap.org/data/2.5/weather')
    )
  })

  it('should throw an error if weather fetch fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401
    })

    await expect(getWeatherData('London')).rejects.toThrow(
      'Failed to fetch weather data'
    )
  })

  it('should throw an error if data is invalid', async () => {
    const invalidData = { name: 'London', main: null, weather: [] }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => invalidData
    })

    await expect(getWeatherData('London')).rejects.toThrow(
      'Invalid weather data'
    )
  })
})
