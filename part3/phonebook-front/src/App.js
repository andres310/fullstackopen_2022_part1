import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/Persons'
import { PersonsForm, Persons, Filter, Notification } from './components/Person'

const App = () => {

  const [persons, setPersons] = useState([])

  const [filterInput, setFilterInput] = useState('')

  const [showAll, setShowAll] = useState(true)

  const [message, setMessage] = useState(null)

  const [messageType, setMessageType] = useState('')

  const personsToShow = showAll
    ? persons
    : persons.filter(({ name }) => name.toLowerCase().includes(filterInput))

  const deleteAPerson = (id, name) => {
    personsService
      .deletePerson(id)
      .then(() => {
        if (window.confirm(`Delete ${name} ?`)) {
          setPersons(persons.filter(p => p.id !== id))
        }
      })
      .catch(error => {
        setMessageType('error')
        setMessage(`Information of ${name} has already been removed from server`)
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 5000)
      })
  }

  // Hook for fetching data from server
  const fetchData = () => personsService.getAll().then(initialPhonebook => setPersons(initialPhonebook))

  useEffect(fetchData, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={messageType} message={message} />
      <Filter setFilterInput={setFilterInput} setShowAll={setShowAll} />
      <h2>Add a new</h2>
      <PersonsForm persons={persons} setPersons={setPersons} setMessage={setMessage} setMessageType={setMessageType} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} deleteAPerson={deleteAPerson} />
    </div>
  )
}

export default App