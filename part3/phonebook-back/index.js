require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
// const mongoose = require('mongoose')

// middleware
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

/* Generates a random id between 100 and persons current length */
/*const generateId = () => {
    const len = persons.length
    return Math.random() * (100 - len) + len;
}*/

/* REST services */

/* Returns info page */
app.get('/info', (request, response) =>
  Person.countDocuments({})
    .then(count => response.send(
      `<p>Phonebook has info for ${count} people</p>
            <p>${Date()}</p>`
    ))
)

/* Returns all contacts in phonebook */
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => response.json(people))
})

/* Returns a single contact given its id */
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

/* Adds a new contact to phonebook */
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name && !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

/* Updates a single contact given an id */
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})

/* Deletes a single contact given an id */
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

/* END of REST services */

/* ERROR MIDDLEWARE */

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)
