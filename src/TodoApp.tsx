// src/TodoApp.tsx
import React, { useState } from 'react';
import { Todo } from './type';
import './App.css';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoText, setEditTodoText] = useState<string>('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      alert('Please enter a task.');
      return;
    }

    if (todos.some(todo => todo.text === newTodo.trim())) {
      alert('This task already exists.');
      return;
    }

    setTodos([...todos, { id: Date.now(), text: newTodo }]);
    setNewTodo('');
    alert('Task added successfully!');
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const handleUpdateTodo = () => {
    if (editTodoText.trim() === '') {
      alert('Please enter a task.');
      return;
    }

    if (todos.some(todo => todo.text === editTodoText.trim() && todo.id !== editTodoId)) {
      alert('This task already exists.');
      return;
    }

    setTodos(todos.map(todo =>
      todo.id === editTodoId ? { ...todo, text: editTodoText } : todo
    ));
    setEditTodoId(null);
    setEditTodoText('');
    alert('Task updated successfully!');
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    alert('Task deleted successfully!');
  };

  return (
    <div className="todo-app">
      <h1>ToDo App</h1>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      {editTodoId !== null && (
        <div className="todo-edit">
          <input
            type="text"
            value={editTodoText}
            onChange={(e) => setEditTodoText(e.target.value)}
            placeholder="Edit task"
          />
          <button onClick={handleUpdateTodo}>Update</button>
        </div>
      )}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
