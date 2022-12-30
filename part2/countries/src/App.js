import { useState, useEffect } from 'react'
import Search from './components/Search'
import { Countries, CountryDetails } from './components/Country'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  const [searchInput, setSearchInput] = useState('')

  // Show 1 or 10
  const countriesToShow = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(searchInput.toLowerCase()))

  // Hook to fetch all data from the endpoint /v3/all
  const getAllCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }

  useEffect(getAllCountries, [])
  
  /* 
  There are 3 possible states for showing the countries:
  1. Too many results, show a message 'Too many matches, specify another filter'
  2. If there are ten or fewer countries, list them
  3. If there is only one country list their info like this: 
    Name, capital, area, languages list and flag
  */

  // Don't show
  if (countriesToShow.length > 10) {
    return (
      <div>
        find countries <Search setSearchInput={setSearchInput} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  // Show 1
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        find countries <Search setSearchInput={setSearchInput} />
        <CountryDetails name={countriesToShow[0].name.common} capital={countriesToShow[0].capital} area={countriesToShow[0].area} languages={countriesToShow[0].languages} flags={countriesToShow[0].flags} capitalInfo={countriesToShow[0].capitalInfo} />
      </div>
    )
  // List 10 or less
  } else {
    return (
      <div>
        find countries <Search setSearchInput={setSearchInput} />
        <Countries countries={countriesToShow} setSearchInput={setSearchInput} />
      </div>
    )
  }
}

export default App