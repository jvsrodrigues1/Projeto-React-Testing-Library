import React from 'react';
import { screen, act } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('4. Teste o componente <NotFound.js />', () => {
  test('Verifica se a página possui o texto de Not Found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/404-error');
    });
    const pageNotFound = screen.getByRole('heading', { name: /not found/i, level: 2 });
    expect(pageNotFound).toBeInTheDocument();
    expect(pageNotFound).toHaveTextContent('Page requested not found');
  });

  test('Verifica se a página renderiza o gif com a url correta', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/404-error');
    });
    const imgNotFound = screen.getByRole('img', { name: /Pikachu crying/i });
    const altText = 'Pikachu crying because the page requested was not found';
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imgNotFound).toHaveAttribute('alt', altText);
  });
});
