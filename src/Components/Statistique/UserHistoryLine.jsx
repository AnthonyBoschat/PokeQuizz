import React from "react";
import { useSelector } from "react-redux";

function UserHistoryLine({historic}){
    const pokemonList = useSelector(store => store.pokemons.pokemonsList)
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Question_mark_basic.svg/1024px-Question_mark_basic.svg.png"
    let key = 0

    const generateHistoriqueColor = (pokemon) => {
        const thisPokemon = pokemonList?.find(pokemonOfList => pokemonOfList.name === pokemon.name)
        key++
        const backgroundStyle = pokemon.win ? {backgroundColor:"rgba(27, 111, 144, 0.647)"} : {backgroundColor:"rgba(136, 15, 15, 0.704)"}
        return(
            <div key={key} style={backgroundStyle}>
                <img src={thisPokemon?.image ?? defaultImage} title={thisPokemon?.name} />
            </div>
        )
    }

    return(
        <span className="historicLine">
            {historic.map(pokemon => generateHistoriqueColor(pokemon))}
        </span>
    )
}

export default UserHistoryLine;