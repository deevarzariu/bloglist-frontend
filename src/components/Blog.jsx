import PropTypes from 'prop-types';
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
    <div className='blog-details' style={showDetails ? null : { display: 'none' }}>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={() => onLike(blog)}>like</button>
      </div>
      {blog.user && <div>added by {blog.user.name}</div>}
      {blog.user && user.username === blog.user.username &&
        <button onClick={() => onRemove(blog)}>remove</button>
      }
    </div>
  </div>;
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.object,
  }),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }),
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Blog;