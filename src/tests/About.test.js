import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('2. Teste o componente <About.js />.', () => {
  test('Verifica se a página possui um titulo "About Pokédex"', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('About Pokédex');
  });

  test('Verifica se existem dois paragrafos sobre a pokédex', () => {
    renderWithRouter(<About />);

    const text1 = screen.getByText(/This application/i);
    expect(text1).toBeInTheDocument();
    expect(text1).toHaveTextContent('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');

    const text2 = screen.getByText(/One can filter/i);
    expect(text2).toBeInTheDocument();
    expect(text2).toHaveTextContent('One can filter Pokémons by type, and see more details for each one of them');
  });

  test('Verifica se a a imagem da página existe e possui a url correta', () => {
    renderWithRouter(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', url);
  });
});
