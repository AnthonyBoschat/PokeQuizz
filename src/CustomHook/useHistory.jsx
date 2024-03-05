import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuizzHistory, deleteFirstHistory } from "../Redux/Slices/Quizz/QuizzHistorySlices";
import { useParams } from "react-router-dom";

export default function useHistory(){

    const params = useParams()
    const dispatch = useDispatch()
    const pokemonsAnswer = useSelector(store => store.quizz.pokemonsAnswer)
    const quizzHistory = useSelector(store => store.quizzHistory)
    const [historyDisplay, setHistoryDisplay] = useState(false)
    const thisUser = quizzHistory.find(user => user.userName === params.userName)
    const [currentUserVision, setCurrentUserVision] = useState(thisUser)


    
    // Sauvegarde l'historique des quizz réaliser pour cette utilisateur
    const saveHistory = () => {
        dispatch(addQuizzHistory({userName:params.userName, history:pokemonsAnswer})) // Sauvegarde du quizz pour cette utilisateur
        const thisUserHistory = quizzHistory.find(user => user.userName === params.userName)
        if(thisUserHistory.history.length === 10){ // On ne dépasse pas 10 quizz d'historique.
            dispatch(deleteFirstHistory({userName:params.userName}))
        }
    }

    // Change le focus de l'utilisateur pour visualiser son historique
    const handleClickChangeHistory = (userName) => {
        const newUserVision = quizzHistory.find(user => user.userName === userName)
        setCurrentUserVision(newUserVision)
    }

    return{
        historyDisplay,
        setHistoryDisplay,
        saveHistory,
        handleClickChangeHistory,
        currentUserVision,
        setCurrentUserVision
    }
}