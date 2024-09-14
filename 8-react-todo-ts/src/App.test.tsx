import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeDefined();
    expect(button).toBeDefined();
  });
});

test('should add task to list when add button is clicked', () => {
  render(<App />);

  const input = screen.getByRole('textbox', { name: 'Add Task:' });
  const button = screen.getByRole('button', { name: 'Add' });

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(button);

  expect(screen.getByText('New Task')).toBeInTheDocument();
});
