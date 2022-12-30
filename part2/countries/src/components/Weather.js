import axios from "axios"
import { useEffect, useState } from "react"

/**
 * @constant {String} api_key variable has now the value set in startup
 */
const api_key = process.env.REACT_APP_API_KEY

/**
 * Converts kelvin to celsius
 * @param {Number} temp temperature in kelvin 
 * @returns {Number} temperature in celcius 
 */
const kelvinToCelcius = (temp) => temp - 273.15

/**
 * Renders the weather, temperature and wind from a given place
 * @param {String} place Name of the place to get weather from
 */
const PlaceWeather =  ({ place, latitude, longitude }) => {
  const [description, setDescription] = useState('')
  const [temp, setTemp] = useState('')
  const [icon, setIcon] = useState('')
  const [wind, setWind] = useState('')

  const hookWeather = () => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
    .then(response => {
      setDescription(response.data.weather[0].description)
      setTemp(response.data.main.temp)
      setIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      setWind(response.data.wind.speed)
    }, 
    error => console.error('WEA: ', error))
  }

  useEffect(hookWeather, [])

  return (
    <div>
      <h1>Weather in { place }</h1>
      <p>temperature { kelvinToCelcius(temp) } Celcius</p>
      <img src={ icon } alt={ description } />
      <p>wind { wind } m/s</p>
    </div>
  )
}

/**
 * Renders weather for a given country capital
 * @param {Array} capital Capital or capitals of a country
 * @param {Array} info Latitude and longitude of the capital (in that order)
 */
const CapitalWeather = ({ capital, info }) => (
  <PlaceWeather place={capital} latitude={info.latlng[0]} longitude={info.latlng[1]} />
)

export { CapitalWeather }