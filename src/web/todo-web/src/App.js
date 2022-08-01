import './App.css';
import Todo from './components/Todo';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const user = {
    name: "Shifu"
  };

  return (
    <div className="App">
      <Todo user={user}></Todo>
    </div>
  );
}

export default App;
