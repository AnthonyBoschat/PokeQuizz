import React from "react";
import { useSelector } from "react-redux";
import QuizzAnswerName from "./QuizzAnswerName";
import QuizzAnswerType from "./QuizzAnswerType";

function QuizzAnswer(){

    const indexQuizSelected = useSelector(store => store.quizzResponse.indexQuizSelected)
    const quizzResponse = useSelector(store => store.quizz.quizzResponse)

    

    const findAnswerOfThisQuiz = () => {
        switch(indexQuizSelected){
            case 0:
                return <QuizzAnswerName />
            case 1:
                return <QuizzAnswerType />
        }
    }

    return(
        <div className="pokemonQuizzResponseDisplay">
            {quizzResponse && (findAnswerOfThisQuiz())}
        </div>
    )
    
}

export default QuizzAnswer;