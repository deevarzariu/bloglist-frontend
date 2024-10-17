import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    blogService.setToken(userData.token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = await loginService.login({ username, password });
    setUser(userData);
    setUsername("");
    setPassword("");
    localStorage.setItem("user", JSON.stringify(userData));
    blogService.setToken(userData.token);
  }

  const handleCreatePost = async (e) => {
    e.preventDefault();
    await blogService.createBlog({ title, author, url });
    setBlogs([...blogs, newPost]);
    setTitle("");
    setAuthor("");
    setUrl("");
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in.
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <form onSubmit={handleCreatePost}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => { setAuthor(e.target.value) }}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value) }}
          />
        </div>
        <input type="submit" value="create" />
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App