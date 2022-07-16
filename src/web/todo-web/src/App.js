import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';

function App() {
  const user = {
    name: "Shifu"
  };

  return (
    <div className="App">
      <Todo user={user}></Todo>
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
