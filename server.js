const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config()

const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/weather', async (req, res) => {
  const zipCode = req.body.zipCode

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${process.env.API_KEY}&units=imperial`

    
    const response = await axios.get(weatherUrl)

    const weatherData = response.data;
    const weather = {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description, 
      city: weatherData.name,
    }
    res.render('show', { weather })
  } catch (error) {
    console.log('Error details:', error.response ? error.response.data : error.message);
    res.status(500).send('Something went wrong!')
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
