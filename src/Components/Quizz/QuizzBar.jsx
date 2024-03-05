import React from "react";
import { useSelector } from "react-redux";

function QuizzBar(){

    const pokemonsAnswer = useSelector(store => store.quizz.pokemonsAnswer)
    const pokemonsOfQuizz = useSelector(store => store.quizz.pokemonsOfQuizz)


    const generateStep = (pokemonName) => {
        let backgroundStyle
        const pokemonFind = pokemonsAnswer.find(pokemon => pokemon.name === pokemonName)
        if(!pokemonFind){backgroundStyle={backgroundColor:"rgba(207, 207, 207, 0.431)"}}
        else{
            if(pokemonFind.win){backgroundStyle={backgroundColor:"rgba(27, 111, 144, 0.647)"}}
            else{backgroundStyle={backgroundColor:"rgba(136, 15, 15, 0.704)"}}
        }
        return <div style={backgroundStyle} key={pokemonName}></div>
    }

    return(
        <div className="quizzBarDisplay">
            <div className="quizzBarBox">
                {pokemonsOfQuizz.map(pokemon => generateStep(pokemon.name))}
            </div>
        </div>
    )
}

export default QuizzBar;