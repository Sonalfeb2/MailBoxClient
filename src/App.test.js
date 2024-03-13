import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Web link', () => {
  render(<App />);
  const linkElement = screen.getByText('Web Link');
  expect(linkElement).toBeInTheDocument();
});
