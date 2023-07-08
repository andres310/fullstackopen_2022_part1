const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const newPerson = {
  name: process.argv[3],
  number: process.argv[4],
}

const url = `mongodb+srv://andresya:${password}@cluster0.s2wvpem.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    // Add a new person to phonebook
    if (process.argv.length === 5) {
      const person = new Person(newPerson)
      return person.save()
        .then(() => {
          console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
          return mongoose.connection.close()
        })
    }
    // Show all phonebook contacts
    return Person.find({})
      .then(result => {
        console.log('phonebook:')
        result.forEach(person => console.log(`${person.name} ${person.number}`))
        return mongoose.connection.close()
      })

  })
  .catch(error => console.error(error))
