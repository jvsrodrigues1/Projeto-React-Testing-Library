import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('5. Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
  });

  test('Verifica se a página possui um titulo', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Encountered pokémons');
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveTextContent('More details');
  });

  test('Verifica se, ao clicar no botão próximo pokémon, um novo pokémon é renderizado', () => {
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();
    expect(nextPokemonBtn).toHaveTextContent('Próximo pokémon');

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    expect(pokemonName).toHaveTextContent(/charmander/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/fire/i);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(/Average weight: 8.5 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    expect(pokemonName).toHaveTextContent(/caterpie/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/bug/i);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(/Average weight: 2.9 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);

    expect(pokemonName).toHaveTextContent(/ekans/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/poison/i);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.9 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);

    expect(pokemonName).toHaveTextContent(/alakazam/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/psychic/i);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(/Average weight: 48.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
  });

  test('Verifica se apenas um pokémon é mostrado por vez', () => {
    const img = screen.getAllByRole('img');
    expect(img).toHaveLength(1);
  });

  test('Verifica existência e funcionalidade dos botões de filtro', () => {
    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    const number = 7;
    expect(typeBtn).toHaveLength(number);

    pokemons.forEach(({ type }) => {
      const btnFilter = screen.getByRole('button', { name: type });
      expect(btnFilter).toBeInTheDocument();
    });
  });

  test('Verifica se existe um botão para resetar o filtro', () => {
    const allPokemonBtn = screen.getByRole('button', { name: /all/i });
    expect(allPokemonBtn).toBeInTheDocument();
    expect(allPokemonBtn).toHaveTextContent('All');

    userEvent.click(allPokemonBtn);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
  });
});
