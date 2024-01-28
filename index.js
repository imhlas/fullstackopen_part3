require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
    const length = persons.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${length} persons</p>
    <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
  })

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }

    const newId = Math.floor(Math.random() * 100000)

    const person = new Person({
        name: body.name,
        number: body.number,
        id: newId.toString(),
      })

    person.save().then(savedPerson => {
        response.json(savedPerson)
      })
})
    
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })