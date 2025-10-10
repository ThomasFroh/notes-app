const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = request => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

notesRouter.get('/', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    try {
      const notes = await Note.findAll(); // Assuming 'Note' is your Sequelize model
      response.json(notes);
    } catch (err) {
      console.error('Database query failed:', err);
      response.status(500).json({ error: 'Failed to fetch notes' });
    }
});

notesRouter.get('/:user_id', async (request, response) => {
    const user_id = String(request.params.user_id);
    const notes = await Note.findAll({ where: { user_id } });
    response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
    const id = String(request.params.id);

    try {
        const note = await Note.findByPk(id);

        if (note) {
        response.json(note);
        } else {
        response.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        console.error('Error fetching note:', error);
        response.status(500).json({ error: 'Error fetching note' });
    }
});

notesRouter.put('/:id', async (request, response) => {
    const id = String(request.params.id);
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' });
    }

    try {
        const note = await Note.findByPk(id);

        if (!note) {
        return response.status(404).json({ error: 'Note not found' });
        }

        note.content = body.content;
        note.important = Boolean(body.important) || false;

        await note.save();
        response.json(note);
    } catch (error) {
        console.error('Error updating note:', error);
        response.status(500).json({ error: 'Error updating note' });
    }
});

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

notesRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    console.log('decodedToken: ', decodedToken)
    const user = await User.findByPk(decodedToken.id)

    if (!user) {
        return response.status(404).json({ error: 'User not found' })
    }

    if (!body.content) {
        return response.status(400).json({ 
        error: 'content missing' 
        })
    }

    try {
        const note = Note.build({
        content: body.content,
        important: Boolean(body.important) || false,
        id: body.id,
        user_id: user.id,
    })

    // const note = {
    //   content: body.content,
    //   important: Boolean(body.important) || false,
    //   id: body.id,
    // }

        await note.save();
        response.status(201).json(note);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }

// const sql = "INSERT INTO note SET ?"

// connection.query(sql, note, (err, result) => {
//   if (err) {
//     console.error('error inserting note: ', err)
//     return response.status(500).json({ error: 'Error inserting note' })
//   }

//   console.log('new note inserted')
//   response.status(201).json(note)
// })
})

notesRouter.delete('/:id', async (request, response) => {
    const id = String(request.params.id);

    try {
        const note = await Note.findByPk(id);
        if (!note) {
        return response.status(404).json({ error: 'Note not found' });
        }

        await note.destroy();
        response.status(204).end();
    } catch (error) {
        console.error('Error deleting note:', error);
        response.status(500).json({ error: 'Error deleting note' });
    }
});

module.exports = notesRouter