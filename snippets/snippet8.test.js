import React, { useState, useEffect } from 'react';
import { render } from '@testing-library/react';

// Mock fetch globally
global.fetch = jest.fn();

const BlogPost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    Promise.all([
      fetch(`/api/posts/${postId}`).then(res => res.json()),
      fetch(`/api/posts/${postId}/comments`).then(res => res.json())
    ]).then(([postData, commentsData]) => {
      setPost(postData);
      setComments(commentsData);
    });
  }, [postId]);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div>
        <h3>Comments ({comments.length})</h3>
        {comments.map(comment => (
          <div key={comment.id}>{comment.text}</div>
        ))}
      </div>
    </article>
  );
};

describe('Snippet 8: Null Reference Bug', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should render without crashing when post is initially null', () => {
    // Mock API responses
    fetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ id: 1, title: 'Test Post', content: 'Test content' })
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([{ id: 1, text: 'Great post!' }])
      });

    expect(() => {
      render(<BlogPost postId={1} />);
    }).not.toThrow();
  });
});
