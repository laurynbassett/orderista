const axios = require('axios')

module.exports = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})
