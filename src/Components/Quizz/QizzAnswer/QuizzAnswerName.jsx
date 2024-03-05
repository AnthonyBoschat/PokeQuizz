import React from "react";
import { useSelector } from "react-redux";

function QuizzAnswerName(){

    // const quizzResponse = useSelector(store => store.quizz.quizzResponse)
    const pokemonsOfQuizz = useSelector(store => store.quizz.pokemonsOfQuizz)
    const indexOfQuizz = useSelector(store => store.quizz.indexOfQuizz)

    return(
        <div className="pokemonQuizzResponseName">
            {pokemonsOfQuizz[indexOfQuizz].name}
        </div>
    )
}

export default QuizzAnswerName;