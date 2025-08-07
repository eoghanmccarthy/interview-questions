import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';

const UserCard = ({ user }) => {
  const [displayName, setDisplayName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  
  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };
  
  return (
    <div>
      <img src={avatar} alt={displayName} data-testid="user-avatar" />
      <h3 data-testid="user-name">{displayName}</h3>
      <button onClick={() => updateAvatar('new-avatar.jpg')}>
        Change Avatar
      </button>
    </div>
  );
};

describe('Snippet 7: Props Not Syncing Bug', () => {
  test('should update display when user prop changes', () => {
    const user1 = { id: 1, name: 'Alice', avatar: 'alice.jpg' };
    const user2 = { id: 2, name: 'Bob', avatar: 'bob.jpg' };
    
    const { rerender } = render(<UserCard user={user1} />);
    
    // Initially shows first user
    expect(screen.getByTestId('user-name')).toHaveTextContent('Alice');
    expect(screen.getByTestId('user-avatar')).toHaveAttribute('src', 'alice.jpg');
    
    // Change to second user
    rerender(<UserCard user={user2} />);

    expect(screen.getByTestId('user-name')).toHaveTextContent('Bob');
    expect(screen.getByTestId('user-avatar')).toHaveAttribute('src', 'bob.jpg');
  });
});
