import React from "react";
import { useSelector } from "react-redux";
import useQuizzChoice from "../../../CustomHook/Quizz/useQuizzChoice";

function QuizzResponsesAll({quizzOnRef}){

    const indexQuizSelected = useSelector(store => store.quizzResponse.indexQuizSelected)
    const {listQuizz} = useQuizzChoice(quizzOnRef)


    return(
        <>
            {listQuizz[indexQuizSelected]}
        </>
        
    )
}

export default QuizzResponsesAll;