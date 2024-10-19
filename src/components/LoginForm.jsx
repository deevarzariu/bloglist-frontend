import PropTypes from 'prop-types';
import { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
    setUsername('');
    setPassword('');
  };

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">
        username
      </label>
      <input
        type="text"
        id="username"
        name="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <input type="submit" value="log in" />
  </form>;
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;