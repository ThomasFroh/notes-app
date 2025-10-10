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
        <tr>
            <td key={note.id} onClick={handleEdit}>{note.content}</td>
            <button onClick={handleDelete}>X</button>
        </tr>
    );
}

export default Note;
