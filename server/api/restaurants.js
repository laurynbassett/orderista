const cuisineList = require('./cuisines')
const router = require('express').Router()
const axios = require('./axios')

axios.defaults.headers.get['user-key'] = process.env.REACT_APP_API_KEY

const config = {
  params: {
    lat: 41.8781,
    lon: -87.6298,
  },
}

// GET /restaurants
router.get('/', async (req, res, next) => {
  try {
    const a = await axios.get(
      '/search?entity_id=292&entity_type=city&start=0&count=20'
    )
    const b = await axios.get(
      '/search?entity_id=292&entity_type=city&start=20&count=20'
    )
    const c = await axios.get(
      '/search?entity_id=292&entity_type=city&start=40&count=20'
    )
    const d = await axios.get(
      '/search?entity_id=292&entity_type=city&start=60&count=20'
    )
    const e = await axios.get(
      '/search?entity_id=292&entity_type=city&start=80&count=20'
    )
    const restaurants = [
      ...a.data.restaurants,
      ...b.data.restaurants,
      ...c.data.restaurants,
      ...d.data.restaurants,
      ...e.data.restaurants,
    ].map((el) => {
      el = el.restaurant
      el.image = el.thumb
      el.longitude = el.location.longitude
      el.latitude = el.location.latitude
      el.address = el.location.address
      el.locality = el.location.locality
      el.aggregateRating = el.user_rating.aggregate_rating
      el.ratingText = el.user_rating.rating_text
      el.priceRange = el.price_range
      el.reviewCount = el.all_reviews_count
      el.votes = el.user_rating.votes
      el.photoCount = el.photo_count
      el.cuisines = el.cuisines.includes(', ')
        ? el.cuisines.split(', ')
        : [el.cuisines]
      return el
    })
    res.json(restaurants)
  } catch (err) {
    next(err)
  }
})

// GET /restaurants/cuisines
router.get('/cuisines', async (req, res, next) => {
  try {
    const {data} = await axios.get('/cuisines', config)
    const cuisines = data.cuisines.filter((el) => {
      return cuisineList.includes(el.cuisine.cuisine_name)
    })
    res.json(cuisines)
  } catch (err) {
    next(err)
  }
})

// GET /restaurants/categories
router.get('/categories', async (req, res, next) => {
  try {
    const {data} = await axios.get('/categories', config)
    res.json(data.categories)
  } catch (err) {
    next(err)
  }
})

module.exports = router
