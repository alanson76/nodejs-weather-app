const request = require('request');
const { DARKSKY_API_KEY } = require('../../config/config')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${long}?units=si`


  request({
    url,
    json: true
  }, (err, res) => {
    if (err) {
      callback('Unable to connect to weather service', undefined)
    } else if (res.body.error) {
      callback('Unable to get the weather info. please try again', undefined)
    } else {
      const { summary } = res.body.hourly
      const { temperature, precipProbability } = res.body.currently

      callback(undefined, {
        summary,
        temperature,
        precipProbability
      })
    }
  })
}

module.exports = forecast




