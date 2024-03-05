import React from "react";
import { useSelector } from "react-redux";

function QuizzAnswerType(){

    const answerType = useSelector(store => store.quizzResponse.answerType)

    return(
        <div className="pokemonQuizzResponseType">
            {answerType.map(type => (<div key={type} className={`typeButton ${type} `}>{type}</div>))}
        </div>
    )
}

export default QuizzAnswerType;