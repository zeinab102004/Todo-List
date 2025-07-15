
import './App.css';
import {TodosContext} from './contexts/TodosContext'

import ToDoList from './componants/ToDoList';
import { useState } from 'react';
import TodosProvider from './contexts/TodosContext';
const initialTodos = [];
function App() {
  const [todosState, setTodosState] =useState(initialTodos);

return (
  <TodosProvider>
    <div className="App" style={{ textAlign:"center",display: 'flex', alignItems: 'center', justifyContent: 'center',
       backgroundColor: '#191b1f', height: '100vh', direction: 'rtl'}}>
      <ToDoList />
    </div>
    </TodosProvider>
  );
}

export default App;
