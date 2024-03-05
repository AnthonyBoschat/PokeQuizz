import React, { useEffect } from "react";
import QuizzResponsesName from "../../Components/Quizz/QuizzResponses/QuizzResponsesName";
import { useDispatch, useSelector } from "react-redux";
import { updateAnswerType, updateIndexQuizSelected } from "../../Redux/Slices/Quizz/QuizzResponseSlice";
import QuizzResponsesType from "../../Components/Quizz/QuizzResponses/QuizzResponsesType";

export default function useQuizzChoice(quizzOnRef){

    const dispatch = useDispatch()
    const pokemonsOfQuizz = useSelector(store => store.quizz.pokemonsOfQuizz)
    const indexOfQuizz = useSelector(store => store.quizz.indexOfQuizz)


    const listQuizz = [
        <QuizzResponsesName quizzOnRef={quizzOnRef}/>,
        <QuizzResponsesType quizzOnRef={quizzOnRef}/>,
    ]

    const determineRandomQuizz = () => {
        const index = Math.floor(Math.random() * listQuizz.length)
        dispatch(updateIndexQuizSelected(index))
        return index
    }

    const saveDataNecessaryForAnswer = (index) => {
        console.log("index => ", index)
        switch(index){
            case 0:
                return
            case 1:
                const type = pokemonsOfQuizz[indexOfQuizz]?.apiTypes.map(type => type.name) // On récupère les types du pokemon présenter
                dispatch(updateAnswerType(type)) // On sauvegarde la bonne réponse dans redux
                console.log("Type du pokemon : ", type)
                return
            default:
                return
        }
    }


    return{
        listQuizz,
        determineRandomQuizz,
        saveDataNecessaryForAnswer
    }
}