function Note(props) {

    return (
        <div className="Note">
            <p>{props.note.content}</p>
        </div>
    );
}

export default Note;
