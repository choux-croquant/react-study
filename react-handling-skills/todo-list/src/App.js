import { useCallback, useState, useRef } from 'react';
import './App.css';
import TodoInsert from './component/TodoInsert';
import TodoList from './component/TodoList';
import TodoTemplate from './component/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일${i}`,
      checked: false
    });
  }
  return array
};

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? {...todo, checked: !todo.checked} : todo);
      default:
        return todos;
  }
}

function App() {
  const [todos, setTodos] = useState(createBulkTodos);

  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false
      };
      setTodos(todos => todos.concat(todo));
      nextId.current += 1;
    },
    [],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
    },
    [],
  );
  
  const onToggle = useCallback(
    id => {
      setTodos(todos =>
        todos.map(todo => 
          todo.id === id ? {...todo, checked: !todo.checked} : todo
        ),
      );
    },
    []
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
