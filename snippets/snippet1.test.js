import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

const TodoList = ({ initialTodos = [] }) => {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    setTodos(todos);
  };

  return (
      <ul>
        {todos.map(todo => (
            <li
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none'
                }}
            >
              {todo.text}
            </li>
        ))}
      </ul>
  );
};

describe('Snippet 1: Todo Toggle Bug', () => {
  test('should toggle todo completed status when clicked', () => {
    const mockTodos = [
      { id: 1, text: 'Learn React', completed: false },
      { id: 2, text: 'Build app', completed: false }
    ];

    render(<TodoList initialTodos={mockTodos} />);

    const firstTodo = screen.getByText('Learn React');

    // Initially should not be completed (no line-through)
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');

    // Click to toggle
    fireEvent.click(firstTodo);

    expect(firstTodo).toHaveStyle('text-decoration: line-through');
  });
});
