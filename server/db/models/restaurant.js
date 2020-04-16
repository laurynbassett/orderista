const Sequelize = require('sequelize')

const db = require('../db')

const Restaurant = db.define('restaurant', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    },
  },
  googleId: {
    type: Sequelize.STRING,
  },
})

// ---------- INSTANCE METHODS ---------- //

// ----------- CLASS METHODS ----------- //

// --------------- HOOKS -------------- //

module.exports = Restaurant
