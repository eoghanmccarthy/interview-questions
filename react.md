# React Bug Snippets for Live Coding Interview

## Snippet 1:

**Ask:** "This todo toggle isn't working. What's wrong and how would you fix it?"

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
        <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
};
```

## Snippet 2

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
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
};
```

## Snippet 3

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

## Snippet 4

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
        <div>{user.name} - {user.email}</div>
      ))}
    </div>
  );
};
```

## Snippet 5

**Ask:** "This counter should increment every second, but it stops at 1. Why?"

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

## Snippet 6

**Ask:** "This crashes with 'hooks can only be called at the top level'. What's the issue?"

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

## Snippet 7

**Ask:** "The onClick handlers fire immediately on render. What's wrong?"

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
      <button onClick={onDelete(todo.id)}>Delete</button>  // Same bug
    </div>
  );
};
```

## Snippet 8

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
    setLoading(false);
  };
  
  useEffect(() => {
    fetchData();
  }, [id]);
  
  if (loading) return <div>Loading...</div>;
  return <div>{data?.title}</div>;
};
```

## Snippet 9

**Ask:** "The theme doesn't update when clicking the button. Why not?"

```javascript
const Settings = () => {
  const [config, setConfig] = useState({ theme: 'light', notifications: true });
  
  const updateTheme = (newTheme) => {
    config.theme = newTheme;
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

## Snippet 10

**Ask:** "The form doesn't reset when switching users. What's the issue?"

```javascript
const EditUser = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    fetchUser(userId).then(user => {
      setName(user.name);
      setEmail(user.email);
    });
  }, [userId]);
  
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
    </form>
  );
};
```

## Snippet 11

**Ask:** "This infinite scroll loads the same data repeatedly. What's wrong?"

```javascript
const InfiniteList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    fetch(`/api/items?page=${page}`)
      .then(res => res.json())
      .then(newItems => setItems([...items, ...newItems]));
  }, [page]);
  
  const loadMore = () => setPage(page + 1);
  
  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};
```

## Snippet 12

**Ask:** "The modal closes unexpectedly when clicking inside it. Why?"

```javascript
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
```

## Snippet 13

**Ask:** "This component re-renders unnecessarily. What's causing it?"

```javascript
const ExpensiveList = ({ items }) => {
  const [filter, setFilter] = useState('');
  
  const processItems = () => {
    return items
      .filter(item => item.name.includes(filter))
      .map(item => ({ ...item, processed: true }));
  };
  
  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {processItems().map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

## Snippet 14

**Ask:** "The password validation doesn't work correctly. What's the bug?"

```javascript
const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    setIsValid(password === confirmPassword && password.length >= 8);
  }, [password]);
  
  return (
    <form>
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <input 
        type="password" 
        value={confirmPassword} 
        onChange={e => setConfirmPassword(e.target.value)} 
      />
      <button disabled={!isValid}>Submit</button>
    </form>
  );
};
```

## Snippet 15

**Ask:** "The component doesn't update when props change. What's missing?"

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

## Snippet 16

**Ask:** "The drag and drop doesn't work properly. What's the issue?"

```javascript
const DragDropList = ({ items }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  
  const handleDragStart = (item) => {
    setDraggedItem(item);
  };
  
  const handleDrop = (targetItem) => {
    console.log('Dropped', draggedItem, 'on', targetItem);
    setDraggedItem(null);
  };
  
  return (
    <div>
      {items.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={handleDragStart(item)}
          onDrop={handleDrop(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
```

## Snippet 17

**Ask:** "The timer doesn't pause/resume correctly. What's wrong?"

```javascript
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  
  return (
    <div>
      <div>Time: {seconds}s</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
};
```

## Snippet 18

**Ask:** "The shopping cart total is wrong when items are updated. What's the bug?"

```javascript
const ShoppingCart = ({ items }) => {
  const [cartItems, setCartItems] = useState(items);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);
  
  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  return (
    <div>
      {cartItems.map(item => (
        <div key={item.id}>
          {item.name} - ${item.price} x 
          <input 
            type="number" 
            value={item.quantity}
            onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
          />
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
};
```

## Snippet 19

**Ask:** "The component crashes when data loads. What's the issue?"

```javascript
const ProductList = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Products ({products.length})</h2>
      {products.map(product => (
        <div key={product.id}>
          {product.name} - ${product.price}
        </div>
      ))}
    </div>
  );
};
```

## Snippet 20

**Ask:** "The component throws 'Cannot read property of undefined'. What's the issue?"

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
