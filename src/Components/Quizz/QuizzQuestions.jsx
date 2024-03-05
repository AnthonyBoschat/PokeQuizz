import React from "react";
import { useSelector } from "react-redux";

function QuizzQuestions(){

    const pokemonsOfQuizz = useSelector(store => store.quizz.pokemonsOfQuizz)
    const indexOfQuizz = useSelector(store => store.quizz.indexOfQuizz)
    const buttonClicked = useSelector(store => store.clicked.buttonClicked)
    


    return(
        <div className="quizzQuestionsBox">
            <img className={buttonClicked ? "" : "blur-disapear"} src={pokemonsOfQuizz[indexOfQuizz]?.image} alt={pokemonsOfQuizz[indexOfQuizz]?.name} title={pokemonsOfQuizz[indexOfQuizz]?.name} />
            {pokemonsOfQuizz[indexOfQuizz + 1] && (<img style={{display:"none"}} src={pokemonsOfQuizz[indexOfQuizz + 1]?.image} alt={pokemonsOfQuizz[indexOfQuizz]?.name} title={pokemonsOfQuizz[indexOfQuizz]?.name} />)}
        </div>
    )
}

export default QuizzQuestions;