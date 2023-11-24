import './Note.css';

function Note(props) {

  return (
    <div className="Note">
        <p>{props.note}</p>
    </div>
  );
}

export default Note;
