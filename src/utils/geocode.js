const request = require('request');
const { MAPBOX_API_KEY } = require('../../config/config')

const geocode = (address, callback) => {

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_API_KEY}`

  request({
    url, json: true
  }, (err, res) => {
    if (err) {
      callback('Unable to connect to location service', undefined)
    } else if (res.body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    } else {

      const features = res.body.features[0]

      callback(undefined, {
        latitude: features.center[1],
        longitude: features.center[0],
        location: features.place_name
      })
    }
  }
  )
}

module.exports = geocode

