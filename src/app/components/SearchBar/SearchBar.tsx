'use client'

import { FormEvent, useEffect, useState } from 'react'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  initialValue?: string
}

export default function SearchBar({ initialValue = '' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (value.trim() === '') {
      e.preventDefault()
      setError('City cannot be empty')
    } else {
      setError('')
    }
  }

  return (
    <form
      method='GET'
      onSubmit={handleSubmit}
      className={styles.searchForm}
      aria-label='Weather search form'
    >
      <div className={styles.inputGroup}>
        <label
          htmlFor='cityInput'
          className={styles.label}
        >
          City name
        </label>
        <input
          id='cityInput'
          type='text'
          name='city'
          placeholder='Enter city name'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.searchInput}
          aria-label='City name'
        />
      </div>
      <button
        type='submit'
        className={styles.searchButton}
      >
        Get Weather
      </button>
      {error && (
        <p
          className={styles.error}
          role='alert'
        >
          {error}
        </p>
      )}
    </form>
  )
}
