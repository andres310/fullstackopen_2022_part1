import { useState } from 'react'

// Renders input for filtering a list of countries
const Search = ({ setSearchInput }) => {
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSearchInput(event.target.value)
  }

  return (
    <>
      <input
        type='search'
        value={search}
        onChange={handleSearch} />
    </>
  )
}

export default Search