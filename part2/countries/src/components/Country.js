import { CapitalWeather } from "./Weather"

/**
 * Renders a single country and button to show that country
 * @param {String} name Country's official name
 * @param {Function} setSearchInput Function to show the set country through the searh bar component
 */
const Country = ({ name, setSearchInput }) => {
  const handleShowCountry = () => setSearchInput(name)

  return (
    <>
      <li>
        { name }
        <button onClick={handleShowCountry}>Show</button>
      </li>
    </>
  )
}

/**
 * Renders a list of official languages for a given country
 * @param {Object} languages Object of official languages
 */
const Languages = ({ languages }) => (
  <ul>
    {Object.keys(languages).map(language => <li key={language}>{languages[language]}</li>)}
  </ul>
)

/** 
 * Renders a country flag image
 * @param {Object} flags Containts two properties with src to img: png and svg
*/
const Flag = ({ flags }) => (
  <img src={flags.png} alt='Country flag' />
)

/** 
 * Renders a single country with details
 * @param {String} name Country name
 * @param {String} capital Country capital
 * @param {String} area Country area code
 * @param {Object} languages List of official languages
 * @param {Object} flag Object containing png and svg versions of the flag
*/
const CountryDetails = ({ name, capital, area, languages, flags, capitalInfo }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <strong>languages:</strong>
      <Languages languages={languages} />
      <Flag flags={flags} />
      <CapitalWeather capital={capital} info={capitalInfo} />
    </div>
  )
}

/**
 * Renders a list of countries
 * @param {Array} countries Array of countries
 */
const Countries = ({ countries, setSearchInput }) => (
  <ul>
    {countries.map(country => <Country key={country.area} name={country.name.common} setSearchInput={setSearchInput} />)}
  </ul>
)

export { Countries, CountryDetails }