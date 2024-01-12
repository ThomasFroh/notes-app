import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function NewNote({ onAddNote }) {
    const [newNote, setNewNote] = useState('')

    const handleInputChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const id = uuidv4()

        onAddNote({ id: id, content: newNote, important: false })
        setNewNote('')
    }

    return(
        <div className="NewNote">
            <form onSubmit={handleSubmit}>
                <label>New Note:</label>
                <input value={newNote} onChange={handleInputChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewNote;
