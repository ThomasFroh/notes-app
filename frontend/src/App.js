import Note from './components/Note';
import NewNote from './components/NewNote';
import LoginForm from './components/LoginForm';
import './App.css';
import { useState, useEffect } from 'react';
import noteService from './services/notes'
import loginService from './services/login'

function App(props) {
    const [notes, setNotes] = useState(props.notes)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
            getNotes()
        }
    }, [])

    const getNotes = () => {
        noteService
        .getAllNotes()
        .then(response => {
            setNotes(response)
        })
        .catch(err => {
            console.log('attempted to get all notes but error')
            throw err
        })
    }

    const addNote = (newNote) => {
        noteService
        .createNote(newNote)
        .then(() => {
            console.log('new note added')
            setNotes([newNote, ...notes])
        })
        .catch(err => {
            console.log('could not add note')
            throw err
        })
    }

    const deleteNote = (id) => {
        noteService
        .deleteNote(id)
        .then(() => {
            console.log('note deleted')
            setNotes(notes.filter(note => note.id !== id))
        })
        .catch(err => {
            console.log('could not delete note')
            throw err
        })
    }

    const handleLogin = async ({ username, password }) => {
        try {
            const user = await loginService.login({
                username,
                password
            })
            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            getNotes()
        } catch (err) {
            console.log('could not login')
            throw err
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteAppUser')
        setUser(null)
    }

    return (
        <div className="App">
            <h1>Notes App</h1>
            {!user && <LoginForm onLogin={handleLogin} />}
            {user && (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <NewNote onAddNote={addNote} ></NewNote>
                    <ul>
                        {notes.map(note => 
                            <Note key={note.id} note={note} onDeleteNote={deleteNote}></Note>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}

export default App;
