import axios from "axios"

/**
 * @var {string} - URL
 */
const baseUrl = 'http://localhost:3001/persons'

/**
 * Queries DB to get all contacts
 * @returns {Promise} - promises all contacts array
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const update = (id, changedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, changedPerson)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(() => {})
}

export default { getAll, create, update, deletePerson }