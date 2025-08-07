import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div>
      <span 
        onClick={onToggle(todo.id)}
        style={{ 
          textDecoration: todo.completed ? 'line-through' : 'none' 
        }}
      >
        {todo.text}
      </span>
      <button onClick={onDelete(todo.id)}>Delete</button>
    </div>
  );
};

describe('Snippet 6: onClick Handler Bug', () => {
  test('should call handlers only when clicked, not on render', () => {
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    const mockTodo = { id: 1, text: 'Test todo', completed: false };

    // Render the component
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    // Handlers should NOT be called during render
    expect(mockOnToggle).not.toHaveBeenCalled();
    expect(mockOnDelete).not.toHaveBeenCalled();

    const todoSpan = screen.getByText('Test todo');
    const deleteButton = screen.getByText('Delete');

    // Click the todo span
    fireEvent.click(todoSpan);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
    expect(mockOnDelete).not.toHaveBeenCalled();

    // Reset and click delete button
    mockOnToggle.mockClear();
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
    expect(mockOnToggle).not.toHaveBeenCalled();
  });
});
