const express = require('express')
const path = require("path")
const cors = require('cors')
const connection = require('./database')

const app = express()

app.use(cors())
app.use(express.json())


app.use(express.static(path.join(__dirname, "client/build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend!"})
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  const sql = "SELECT * FROM NOTE";
  connection.query(sql, function(err, notes) {
    if (err) {
      console.log('err')
      throw err
    }
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
      response.json(note)
  } else {
      response.status(404).end
  }
})

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: body.id,
  }

  const sql = "INSERT INTO note SET ?"

  connection.query(sql, note, (err, result) => {
    if (err) {
      console.error('error inserting note: ', err)
      return response.status(500).json({ error: 'Error inserting note' })
    }

    console.log('new note inserted')
    response.status(201).json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  // const id = Number(request.params.id)
  const sql = `DELETE FROM note WHERE id = '${String(request.params.id)}'`

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('error delete note: ', err)
      return response.status(500).json({ error: 'Error deleting note' })
    }
    console.log('note deleted')
    response.status(204).end()
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connection.connect(function(err) {
    if (err) {
      console.log('error occured while connecting')
      throw err
    }
    else {
      console.log('connection created with mysql successfully')
    }
  })
})