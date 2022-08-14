import './App.css';
import Todo from './components/Todo';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const user = {
    name: "Shifu Meister"
  };

  return (
    <div className="App">
      <Todo username={user.name}></Todo>
    </div>
  );
}

export default App;
