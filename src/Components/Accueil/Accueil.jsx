import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import PokemonsList from "./PokemonsList";
import { useDispatch, useSelector } from "react-redux";
import { updatePokemonsList, updatePokemonsToShow } from "../../Redux/Slices/PokemonsSlices";


function Accueil(){

    const pokemonsList = useSelector(state => state.pokemons.pokemonsList)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!pokemonsList){
            fetch("https://pokebuildapi.fr/api/v1/pokemon")
            .then(response => response.json())
            .then(pokemonsList => dispatch(updatePokemonsList(pokemonsList)))
        }else{
            dispatch(updatePokemonsToShow([]))
        }
    }, [])


    return(
        <>
            <div className="searchBarBox">
                <SearchBar/>
            </div>
            <div className="pokemonsListDisplay">
                <PokemonsList/>
            </div>
        </>
    )
}

export default Accueil;