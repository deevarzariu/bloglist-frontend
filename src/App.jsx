import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const styles = {
  error: {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const getBlogs = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    }
    getBlogs();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, []);

  const showSuccessMessage = (message, milliseconds = 1000) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage("");
    }, milliseconds);
  }

  const showErrorMessage = (message, milliseconds = 1000) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage("");
    }, milliseconds);
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const userData = await loginService.login({ username, password });
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      blogService.setToken(userData.token);
      showSuccessMessage("login successful!", 2000);
    } catch (err) {
      showErrorMessage(err.response.data.error, 5000);
    }
  }

  const handleCreatePost = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.createBlog({ title, author, url });
      setBlogs([...blogs, newBlog]);
      showSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5000)
    } catch (err) {
      showErrorMessage(err.response.data.error, 5000);
    }
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  if (!user) {
    return <div>
      <h2>log in to application</h2>
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
      <LoginForm onSubmit={handleLogin} />
    </div>
  }

  return (
    <div>
      <h2>blogs</h2>
      {successMessage && <div style={styles.success}>{successMessage}</div>}
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
      <div>
        {user.name} logged in.
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <BlogForm onSubmit={handleCreatePost} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App