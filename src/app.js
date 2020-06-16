const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cors = require('cors')
const { PORT } = require('../config/config')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//view enginge setup
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
//static files
app.use(express.static(path.join(__dirname, '../public')))

//cors
// app.use(cors())

//routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Alan'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Alan'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Alan'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided'
    })
  }

  geocode(req.query.address, (err, geoData = {}) => {
    if (err) {
      return res.send(err)
    }

    forecast(geoData.latitude, geoData.longitude, (err, { summary }) => {
      if (err) {
        return res.send(err)
      }

      res.send({
        location: geoData.location,
        forecast: summary,
        address: req.query.address
      })
    })
  })


})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help Article Not Found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page Not Found'
  })
})

//server
const serverPort = Number(PORT) | 3000
app.listen(serverPort, () => {
  console.log(`express server is running on port ${serverPort}`)
})