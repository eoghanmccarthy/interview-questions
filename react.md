# React Bug Snippets

## Snippet 1:

**Question:** "This todo toggle isn't working. What's wrong and how would you fix it?"

```javascript
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  
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
```

## Snippet 2

**Question:** "When userId changes, the component doesn't update. Why?"

```javascript
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
};
```

## Snippet 3

**Question:** "This works but has performance issues and potential race conditions. What problems do you see?"

```javascript
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [query]);
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {results.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
};
```

## Snippet 4

**Question:** "This counter should increment every second, but it stops at 1. Why?"

```javascript
const Counter = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return <div>Count: {count}</div>;
};
```

## Snippet 5

**Question:** "This crashes with 'hooks can only be called at the top level'. What's the issue?"

```javascript
const ProfileForm = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
    </form>
  );
};
```

## Snippet 6

**Question:** "The onClick handlers fire immediately on render. What's wrong?"

```javascript
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
```

## Snippet 7

**Question:** "The component doesn't update when props change. What's missing?"

```javascript
const UserCard = ({ user }) => {
  const [displayName, setDisplayName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  
  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };
  
  return (
    <div>
      <img src={avatar} alt={displayName} />
      <h3>{displayName}</h3>
      <button onClick={() => updateAvatar('new-avatar.jpg')}>
        Change Avatar
      </button>
    </div>
  );
};
```

## Snippet 8

**Question:** "The component throws 'Cannot read property of undefined'. What's the issue?"

```javascript
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
```
