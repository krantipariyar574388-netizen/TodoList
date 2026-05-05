import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

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
    console.log("Input Value:", inputValue);
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    console.log("New Todo Object:", newTodo);
    setTodos([...todos, newTodo]);
    setInputValue("");
    toast.success("Task added successfully!");
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.error("Task deleted!");
  };

  const toggleComplete = (id: number): void => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        if (!todo.completed) {
          toast.success("Task completed!");
        } else {
          toast.info("Task marked as pending");
        }
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            Task Manager
          </h2>

          <form onSubmit={addTodo} className="flex gap-2 mb-8">
            <input
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm active:scale-95"
            >
              Add
            </button>
          </form>

          <ul className="space-y-3">
            {todos.length === 0 && (
              <p className="text-center text-gray-400 py-4 italic">No tasks yet. Add one above!</p>
            )}
            {todos.map(todo => (
              <li
                key={todo.id}
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                  todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span
                    className={`text-gray-700 transition-all ${
                      todo.completed ? 'line-through text-gray-400' : 'font-medium'
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  aria-label="Delete todo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {todos.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              {todos.filter(t => !t.completed).length} Tasks remaining
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;