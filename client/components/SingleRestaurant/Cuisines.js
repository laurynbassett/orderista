import React from 'react'

const Cuisines = (props) => {
  const {restaurant} = props

  return (
    <div className="cuisine">
      <div>{'$'.repeat(restaurant.price_range)}</div>
      <div className="cuisines">
        {restaurant.cuisines.reduce((a, c, i) => {
          if (i > 0) a.push(', ')
          a.push(
            <a key={c} href={`/restaurants/${c}`}>
              {c}
            </a>
          )
          return a
        }, [])}
      </div>
    </div>
  )
}

export default Cuisines
