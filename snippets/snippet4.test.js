import React, { useState, useEffect } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return <div data-testid="counter">Count: {count}</div>;
};

describe('Snippet 4: Counter Stale Closure Bug', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should continue incrementing for multiple intervals', async () => {
    render(<Counter />);
    
    const counter = screen.getByTestId('counter');
    
    // Fast forward 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    await waitFor(() => {
      expect(counter).toHaveTextContent('Count: 5');
    });
  });
});
