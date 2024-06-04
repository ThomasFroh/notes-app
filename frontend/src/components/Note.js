function Note({ note, onDeleteNote }) {

    const handleDelete = (e) => {
        e.preventDefault()

        onDeleteNote(note.id)
    }

    const handleEdit = (e) => {
        e.preventDefault()

        console.log("here's where we'll edit the note somehow and turn it into a text box")
    }

    return (
        <div className="Note">
            <text onClick={handleEdit}>{note.content}</text>
            <button onClick={handleDelete}>X</button>
        </div>
    );
}

export default Note;
