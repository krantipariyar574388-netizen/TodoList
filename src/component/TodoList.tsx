import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

useEffect(() => {
  const saved = localStorage.getItem("my_todos");
  if (saved) {
    setTodos(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  if (todos.length > 0) {
    localStorage.setItem("my_todos", JSON.stringify(todos));
  }
}, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number): void => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>Todo List</h2>
      
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ cursor: 'pointer' }}>Add</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #ddd'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleComplete(todo.id)} 
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
            </div>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;