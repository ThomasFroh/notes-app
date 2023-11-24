import logo from './logo.svg';
import Note from './components/Note';
import './App.css';

function App(props) {
    // const date = new Date()
    // const a = 10
    // const b = 20
    // console.log(date, a+b)
    const notes = props.notes
    console.log('here are the notes', notes)

    return (
        <div className="App">
            <h1>Notes App</h1>
            <ul>
                {notes.map(note => 
                    <Note key={note.id} note={note} ></Note>
                )}
            </ul>
            {/* <div>
            <p>Hello world, it is {date.toString()}</p>
            <p>
                {a} plus {b} is {a + b}
            </p>
            </div> */}
        {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header> */}
        </div>
    );
}

export default App;
