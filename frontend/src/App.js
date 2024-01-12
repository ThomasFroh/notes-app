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
            setNotes(response.data)      })
        }, [])

    const addNote = (newNote) => {
        setNotes([newNote, ...notes])
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
