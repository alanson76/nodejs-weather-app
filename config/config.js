const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
  DARKSKY_API_KEY: process.env.DARKSKY_API_KEY,
  PORT: process.env.PORT
}