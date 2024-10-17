import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const LoginForm = () => {
    return <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            username
          </label>
          <input
            type="text"
            id="username"
            name="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          />
        </div>
        <div>
          <label htmlFor="password">
            password
          </label>
          <input
            type="password"
            id="password"
            name="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>
        <input type="submit" value="log in" />
      </form>
    </div>
  }

  useEffect(() => {
    const getBlogs = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    }
    getBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = await loginService.login({ username, password });
    console.log('userData', userData);
    setUser(userData);
    setUsername("");
    setPassword("");
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in.</div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App