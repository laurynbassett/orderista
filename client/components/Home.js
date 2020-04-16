import React, {useEffect, useState} from 'react'
import axios from 'axios'

import SelectDropdown from './Select'
import Map from './Map'
import cuisineList from '../../server/api/cuisines'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [cuisines, setCuisines] = useState([])

  useEffect(() => {
    const fetchRestaurants = async () => {
      const {data} = await axios.get('/api/restaurants')

      const fetchedRestaurants = data.reduce((a, c) => {
        const rInfo = c.restaurant
        const r = {}
        r.cuisines = rInfo.cuisines.includes(',')
          ? rInfo.cuisines.split(', ')
          : [rInfo.cuisines]
        r.name = rInfo.name
        r.image = rInfo.thumb
        r.longitude = rInfo.location.longitude
        r.latitude = rInfo.location.latitude
        r.info = rInfo
        a.push(r)
        return a
      }, [])
      setRestaurants(fetchedRestaurants)
    }
    fetchRestaurants()
    setCuisines(cuisineList)
  }, [restaurants.length, cuisines.length])

  const handleChange = (evt) => {
    setSelectedCategory(evt.target.value)
  }

  return (
    <div>
      <div className="row">
        <SelectDropdown
          handleChange={handleChange}
          selectedCategory={selectedCategory}
          cuisines={cuisines}
        />
      </div>
      <div className="row">
        <Map restaurants={restaurants} selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}

export default Home
