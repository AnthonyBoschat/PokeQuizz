import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTime from "../../CustomHook/Quizz/useTime";
import { updateTimeoutTriggerID, updateTimerEnd, updateTimerFreeze } from "../../Redux/Slices/Quizz/QuizzResponseSlice";

function QuizzTime({quizzOnRef}){

    const duryQuizzQuestion = useSelector(store => store.parameters.duryQuizzQuestion) // Durée de la question ( basé sur le temp d'animation )
    const buttonClicked = useSelector(store => store.clicked.buttonClicked) // Est-ce que le joueur a valider une réponse ou non
    const indexQuizSelected = useSelector(store => store.quizzResponse.indexQuizSelected)
    const timerEnd = useSelector(store => store.quizzResponse.timerEnd)
    const dispatch = useDispatch()
    const {
        triggerQuizzResponse, // Provoque la réponse négatif ( quand le quizzTime atteint 0 )
        timeRef, // Ref pour suivre la taille de la barre de timer
        freezeTimeBar, // Fonction qui sert à gelé la barre de timer
    } = useTime()
    const indexOfQuizz = useSelector(store => store.quizz.indexOfQuizz) // L'index du quizz en cours
    let timeoutID // stockage de l'ID du timeout



    // Au montage du composant, et quand l'index se met à changer
    useEffect(() => {
        // On provoque un timeOut basé sur la durée de la question, timeout qui provoquera triggerQuizzResponse à la fin
        timeoutID = setTimeout(() => { 
            dispatch(updateTimerEnd(true)) // On indique que le timer est terminer
        }, duryQuizzQuestion * 1000)
        dispatch(updateTimeoutTriggerID(timeoutID))

        return(() => {
            clearTimeout(timeoutID)
        })
    }, [indexOfQuizz, indexQuizSelected])


    // Quand le timer est terminer, on lance le triggerQuizzResponse avec les version à jours des dépendances
    useEffect(() => {
        if(timerEnd){
            triggerQuizzResponse(quizzOnRef, indexQuizSelected)
            dispatch(updateTimerEnd(false)) // On repasse le timer en false
        }

        return(() => {
            dispatch(updateTimerEnd(false))
        })
    }, [timerEnd])


    // Quand l'utilisateur valide une réponse, buttonClicked passe à true
    useEffect(() => {
        if(buttonClicked){ 
            const widthToFreeze = timeRef?.current?.clientWidth
            freezeTimeBar(widthToFreeze, timeRef) // On freeze le timer
            clearTimeout(timeoutID) // On clear le timeout
            // dispatch(updateTimerFreeze(false))
        }
    }, [buttonClicked])
    
    return(
        <div key={indexOfQuizz} className="quizzTimeDisplay">
            <div ref={timeRef} className="quizzTimeBox time-disapear">

            </div>
        </div>
    )
}

export default QuizzTime;