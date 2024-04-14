import Note from './components/Note';
import NewNote from './components/NewNote';
import './App.css';
import { useState, useEffect } from 'react';
import noteService from './services/notes'

function App(props) {
    const [notes, setNotes] = useState(props.notes)

    useEffect(() => {
        noteService
        .getAll()
        .then(response => {
            console.log(response)
            setNotes(response)
        })
        .catch(err => {
            console.log('attempted to get all notes but error')
            throw err
        })
        }, [])

    const addNote = (newNote) => {
        noteService
        .create(newNote)
        .then(() => {
            console.log('new note added')
            setNotes([newNote, ...notes])
        })
        .catch(err => {
            console.log('could not add note')
            throw err
        })
    }

    return (
        <div className="App">
            <h1>Notes App</h1>
            <NewNote onAddNote={addNote} ></NewNote>
            <ul>
                {notes.map(note => 
                    <Note key={note.id} note={note} ></Note>
                )}
            </ul>
        </div>
    );
}

export default App;
