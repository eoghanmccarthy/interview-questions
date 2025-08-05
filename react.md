# React Bug Snippets for Live Coding Interview

## Snippet 1: State Mutation Bug

**Ask:** "This todo toggle isn't working. What's wrong and how would you fix it?"

```javascript
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  
  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed; // Bug here!
    setTodos(todos);
  };
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
};
```

## Snippet 2: useEffect Dependencies

**Ask:** "When userId changes, the component doesn't update. Why?"

```javascript
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, []); // Bug: missing userId dependency
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
};
```

## Snippet 3: Race Conditions & Performance

**Ask:** "This works but has performance issues and potential race conditions. What problems do you see?"

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

## Snippet 4: Missing Keys in Lists

**Ask:** "This filter works but has performance issues when typing. What's wrong?"

```javascript
const UserList = ({ users }) => {
  const [filter, setFilter] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div>
      <input 
        value={filter} 
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter users..."
      />
      {filteredUsers.map(user => (
        <div>{user.name} - {user.email}</div>  // Bug: no key!
      ))}
    </div>
  );
};
```

## Snippet 5: Stale Closure

**Ask:** "This counter should increment every second, but it stops at 1. Why?"

```javascript
const Counter = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);  // Bug: stale closure
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return <div>Count: {count}</div>;
};
```

## Snippet 6: Conditional Hook

**Ask:** "This crashes with 'hooks can only be called at the top level'. What's the issue?"

```javascript
const ProfileForm = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const [name, setName] = useState(user.name);  // Bug: conditional hook
  const [email, setEmail] = useState(user.email);
  
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
    </form>
  );
};
```

## Snippet 7: Event Handler Binding

**Ask:** "The onClick handlers fire immediately on render. What's wrong?"

```javascript
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div>
      <span 
        onClick={onToggle(todo.id)}  // Bug: immediately invoked
        style={{ 
          textDecoration: todo.completed ? 'line-through' : 'none' 
        }}
      >
        {todo.text}
      </span>
      <button onClick={onDelete(todo.id)}>Delete</button>  // Same bug
    </div>
  );
};
```

## Snippet 8: Async State Update

**Ask:** "This can show a warning about setting state on unmounted component. What's the issue?"

```javascript
const DataFetcher = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`/api/data/${id}`);
    const result = await response.json();
    setData(result);
    setLoading(false);  // Bug: what if component unmounts?
  };
  
  useEffect(() => {
    fetchData();
  }, [id]);
  
  if (loading) return <div>Loading...</div>;
  return <div>{data?.title}</div>;
};
```

## Snippet 9: Object Reference Issue

**Ask:** "The theme doesn't update when clicking the button. Why not?"

```javascript
const Settings = () => {
  const [config, setConfig] = useState({ theme: 'light', notifications: true });
  
  const updateTheme = (newTheme) => {
    config.theme = newTheme;  // Bug: direct mutation
    setConfig(config);
  };
  
  return (
    <div>
      <button onClick={() => updateTheme('dark')}>Dark Mode</button>
      <div>Current theme: {config.theme}</div>
    </div>
  );
};
```

## Difficulty Levels

- **Easy**: Keys (#4), Event binding (#7), Hook rules (#6)
- **Medium**: State mutation (#1, #9), useEffect dependencies (#2), Stale closures (#5)
- **Hard**: Race conditions (#3), Async cleanup (#8)
