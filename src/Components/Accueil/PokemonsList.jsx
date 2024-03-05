import React from "react";
import { useSelector } from "react-redux";

function PokemonsList(){

    const pokemonsToShow = useSelector(store => store.pokemons.pokemonsToShow)

    const generatePokemonBox = (pokemon) => {
        return(
            <div key={pokemon.id}>
                <img src={pokemon.image} alt={pokemon.name} title={pokemon.name} />
            </div>
        )
    }

    return(
        <div className="pokemonsToShowBox">
            {pokemonsToShow.map(pokemon => generatePokemonBox(pokemon))}
        </div>
    )
}

export default PokemonsList;