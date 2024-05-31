function Note({ note, onDeleteNote }) {

    const handleDelete = (e) => {
        e.preventDefault()

        onDeleteNote(note.id)
    }

    return (
        <div className="Note">
            <text>{note.content}</text>
            <button onClick={handleDelete}>X</button>
        </div>
    );
}

export default Note;
