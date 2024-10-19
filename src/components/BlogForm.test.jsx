import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

describe('Blog Form', () => {
  test('the onSubmit handler gets called with correct input information after the user presses submit button', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm onSubmit={mockSubmit} />);

    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');
    const submitBtn = container.querySelector('#createBtn');

    await user.type(titleInput, 'my title');
    await user.type(authorInput, 'my author');
    await user.type(urlInput, 'www.my-url.com');
    await user.click(submitBtn);

    expect(mockSubmit.mock.calls).toHaveLength(1);
    expect(mockSubmit.mock.calls[0][0].title).toBe('my title');
    expect(mockSubmit.mock.calls[0][0].author).toBe('my author');
    expect(mockSubmit.mock.calls[0][0].url).toBe('www.my-url.com');
  });
});