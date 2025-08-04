import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

test('renders ShoppyGlobe header and navigation', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  // Check if the header with ShoppyGlobe is rendered
  const headerElement = screen.getByText(/ShoppyGlobe/i);
  expect(headerElement).toBeInTheDocument();
  
  // Check if navigation links are present
  const homeLink = screen.getByText(/Home/i);
  const cartLink = screen.getByText(/Cart/i);
  expect(homeLink).toBeInTheDocument();
  expect(cartLink).toBeInTheDocument();
});
