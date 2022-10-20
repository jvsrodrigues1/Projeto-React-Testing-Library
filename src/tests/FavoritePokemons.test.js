import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../pages';
import App from '../App';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  test('Verifica se a mensagem de Not Found é exibida na tela', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(/no favorite/i);
    const title = screen.getByRole('heading', { name: 'Favorite pokémons', level: 2 });
    expect(notFound).toBeInTheDocument();
    expect(notFound).toHaveTextContent('No favorite pokemon found');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Favorite pokémons');
  });

  test('Verifica se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveTextContent('More details');

    userEvent.click(moreDetails);
    const checkBoxFavorite = screen.getByRole('checkbox');
    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const location = screen.getByRole('heading', { name: /game locations of/i, level: 2 });
    expect(checkBoxFavorite).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(location).toBeInTheDocument();

    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(checkBoxFavorite);
    expect(checkBoxFavorite).toBeChecked();

    userEvent.click(favoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const imgSrc = '/star-icon.svg';
    const img = screen.getByRole('img', { name: /favorite/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgSrc);
    expect(img).toHaveAttribute('alt');
  });
});
