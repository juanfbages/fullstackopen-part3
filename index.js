const Record = require('./models/record')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req, res) => {return JSON.stringify(req.body)})
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Record.find({}).then(notes => {
    response.json(records)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  response.write(`<p>Phonebook has info for ${persons.length} people </p>`)  
  response.write(`${new Date()}`)    
  response.end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({error: 'name missing'})
  } else if (!body.number) {
    return response.status(400).json({error: "number is missing"})
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({error: "name must be unique"})
  }

  const person = {
    "id": Math.floor(Math.random() * (1000000 - 5) + 5),
    "name": body.name,
    "number": body.number
  }

  persons = persons.concat(person)

  response.status(201).json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})