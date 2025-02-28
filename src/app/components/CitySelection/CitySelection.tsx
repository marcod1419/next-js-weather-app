import Link from 'next/link'
import styles from './CitySelection.module.css'
import { cities } from '../../../../config'

export default function CitySelection() {
  return (
    <section
      className={styles.citiesSection}
      aria-labelledby='cities-heading'
    >
      <h2
        id='cities-heading'
        className={styles.citiesHeading}
      >
        Cities
      </h2>
      <ul className={styles.citiesList}>
        {cities.map((city) => (
          <li
            key={city.name}
            className={styles.cityItem}
          >
            <Link
              href={`/?city=${encodeURIComponent(city.query)}`}
              className={styles.cityLink}
              aria-label={`View weather for ${city.displayName}`}
            >
              {city.displayName}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
