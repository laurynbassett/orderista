const router = require('express').Router()
const axios = require('./axios')

const config = {
  params: {
    key: process.env.API_KEY,
    location: '41.8781,- 87.6298',
    radius: '2000',
    type: 'restaurant',
  },
}

// GET /restaurants
router.get('/', async (req, res, next) => {
  try {
    const {data} = await axios.get('/search?entity_id=292&entity_type=city')
    console.log('LGTH', data.restaurants.length)
    res.json(data.restaurants)
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
