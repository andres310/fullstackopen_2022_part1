import { useState } from "react"
import personService from '../services/Persons'
import '../style/notification.css'

const persons = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]

/**
 * Renders a notification on top for 5 seconds
 * @param {String} message displays message
 * @param {String} type the type of notification: 'error' or 'success' 
 * @returns div with message
 */
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={`notification ${type}`}>
      { message }
    </div>
  )
}

// Renders form to add a new person
const PersonsForm = ({ persons, setPersons, setMessage, setMessageType }) => {
  const [newName, setNewName] = useState('')
  const handleNewName = (event) => setNewName(event.target.value)

  const [newNumber, setNewNumber] = useState('')
  const handleNewNumber = (event) => setNewNumber(event.target.value)

  // const [newPersons, setNewPersons] = useState(persons)

  const addNewPerson = (event) => {
    event.preventDefault()

    // For new contact added
    if (!persons.filter(p => p.name === newName).length) {
      const newPerson = { name: newName, number: newNumber, id: persons[persons.length - 1].id + 1 }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson])
          setNewName('')
          setNewNumber('')
          setMessageType('success')
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setMessage(null)
            setMessageType('')
          }, 5000)
        })
        .catch(error => console.error(`Error parece duplicado id: ${newPerson.id}`))

      return
    // Else, update the detected contact
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.error(error))
    }
  }

  return (
    <form onSubmit={addNewPerson}>
      <div>
        Name: <input
          value={newName}
          onChange={handleNewName} />
      </div>
      <div>
        Number: <input 
          value={newNumber} 
          onChange={handleNewNumber} />
      </div>
      <div>
        <button type='submit'>
          Add
        </button>
      </div>
    </form>
  )
}

// Renders a single person
const Person = ({ name, number, deleteAPerson }) => (
  <li>
    {name} {number}
    <button onClick={deleteAPerson}>delete</button>
  </li>
)

// Renders an array of persons
const Persons = ({ persons, setPersons, deleteAPerson }) => {
  return (
  <ul>
    {persons.map(p =><Person key={p.id} name={p.name} number={p.number} setPersons={setPersons} deleteAPerson={() => deleteAPerson(p.id, p.name)} />)}
  </ul>
)}

// Renders input for filtering the list of persons
const Filter = ({ setFilterInput, setShowAll }) => {
  const [filter, setFilter] = useState('')

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setFilterInput(event.target.value)
    setShowAll(event.target.value === '' ? true: false)
    // console.log('Filter: ', filter, ' ShowAll: ', filter !== '' ? true: false);
  }

  return (
    <>
      filter shown with <input 
        type='search'
        value={filter}
        onChange={handleFilter} />
    </>
  )
}

export { persons, PersonsForm, Person, Persons, Filter, Notification }