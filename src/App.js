import logo from './logo.svg';
import './App.css';

function App() {
  const date = new Date()
  const a = 10
  const b = 20
  console.log(date, a+b)

  return (
    <div className="App">
        <div>
          <p>Hello world, it is {date.toString()}</p>
          <p>
            {a} plus {b} is {a + b}
          </p>
        </div>
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
