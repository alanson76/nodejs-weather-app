

const getWeather = (location, callback) => {
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => {
      res.json().then(data => {
        if (data.error) {
          callback(data.error, undefined)
        } else {
          callback(undefined, data)
        }
      })
    })
    .catch(e => console.log(e))
}

//weather search
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'loading...'
messageTwo.textContent = ''


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value;

  getWeather(location, (err, data) => {
    if (err) {
      return messageOne.textContent = err
    }

    messageOne.textContent = data.location
    messageTwo.textContent = data.forecast
  })
})