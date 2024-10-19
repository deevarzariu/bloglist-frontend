import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect } from 'vitest';
import Blog from './Blog';

const user = {
  name: '',
  username: '',
  token: ''
};

const blog = {
  id: 'blog-id',
  title: 'dummy title',
  author: 'dummy author',
  url: 'dummy url',
  likes: 0,
  user
};

describe('Blog', () => {
  test('renders title and author', () => {
    render(
      <Blog
        blog={blog}
        user={user}
        onLike={() => { }}
        onRemove={() => { }}
      />);

    const element = screen.getByText(`${blog.title} ${blog.author}`);
    expect(element).toBeDefined();
  });

  test('does not display blog details before pressing the show button', () => {
    const { container } = render(<Blog blog={blog} user={user} onLike={() => { }} onRemove={() => { }} />);

    // find details container and verify details get rendered
    const element = container.querySelector('.blog-details');
    expect(element).toHaveTextContent(blog.url, { exact: false });
    expect(element).toHaveTextContent(blog.likes, { exact: false });

    // verify that the details are not displayed on screen
    expect(element).toHaveStyle('display: none');
  });

  test('displays blog details after pressing the show button', async () => {
    const user = userEvent.setup();

    const { container } = render(<Blog blog={blog} user={user} onLike={() => { }} onRemove={() => { }} />);

    const button = screen.getByText('show');
    await user.click(button);

    const element = container.querySelector('.blog-details');
    expect(element).not.toHaveStyle('display: none');
  });

  test('if the like button is clicked twice, the onLike event handler is called twice', async () => {
    const user = userEvent.setup();
    const mockLike = vi.fn();

    render(<Blog blog={blog} user={user} onLike={mockLike} onRemove={() => { }} />);

    const likeBtn = screen.getByText('like', {
      selector: 'button'
    });

    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockLike.mock.calls).toHaveLength(2);
  });
});
