import PropTypes from 'prop-types';
import { useState } from 'react';

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="title">title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => { setTitle(e.target.value); }}
      />
    </div>
    <div>
      <label htmlFor="author">author</label>
      <input
        type="text"
        id="author"
        name="author"
        value={author}
        onChange={(e) => { setAuthor(e.target.value); }}
      />
    </div>
    <div>
      <label htmlFor="url">url</label>
      <input
        type="text"
        id="url"
        name="url"
        value={url}
        onChange={(e) => { setUrl(e.target.value); }}
      />
    </div>
    <input type="submit" id="createBtn" value="create" />
  </form>;
};

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default BlogForm;