import { useState } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const Blog = ({ blog, user, onLike, onRemove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'show'}</button>
    </div>
    {showDetails && <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={() => onLike(blog)}>like</button>
      </div>
      {blog.user && <div>added by {blog.user.name}</div>}
      {blog.user && user.username === blog.user.username &&
        <button onClick={() => onRemove(blog)}>remove</button>
      }
    </div>}
  </div>;
};

export default Blog;