import React from "react";
import { useSelector } from "react-redux";
import useSearchBar from "../../CustomHook/useSearchBar";

function SearchBar(){

    const pokemonsList = useSelector(state => state.pokemons.pokemonsList)
    const {filterPokemonsToShow} = useSearchBar()


    return(
        <>
            <input onChange={(e) => filterPokemonsToShow(e)} disabled={!pokemonsList} placeholder='exemple: "Pikachu"'  type="text" />
        </>
    )
}

export default SearchBar;