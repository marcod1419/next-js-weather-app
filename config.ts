export interface CityConfig {
  name: string
  query: string
  displayName: string
}

export const cities: CityConfig[] = [
  { name: 'Toronto', query: 'Toronto', displayName: 'Toronto' },
  { name: 'New York', query: 'New York', displayName: 'New York' },
  { name: 'Vancouver', query: 'Vancouver', displayName: 'Vancouver' }
]
