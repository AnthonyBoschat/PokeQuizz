import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateScore } from "../../Redux/Slices/UsersSlices";
import { updateQuizzScoreInformation } from "../../Redux/Slices/Quizz/QuizzSlices";
import useUsers from "../useUsers";
import { useParams } from "react-router-dom";
import useAnimation from "../useAnimation";

export default function useScore(){

    const dispatch = useDispatch()
    const numberOfQuestion = useSelector(store => store.parameters.numberOfQuestion) // le nombre de question pour le quizz
    const quizzScore = useSelector(store => store.quizz.quizzScore) // Score effectuer pendant le quizz
    const quizzScoreInformation = useSelector(store => store.quizz.quizzScoreInformation)
    const {getScore} = useUsers()
    const params = useParams()
    const [scoreToShow, setScoreToShow] = useState(null)
    const {injectClassAnimationForRefInTimeOut, injectStyleForRefInTimeOut} = useAnimation()
    const [control, setControl] = useState(true)
    const pourcentCorrectAnswerRef = useRef()
    const quizzScoreRef = useRef()
    const starScoreRef = useRef()
    const logoScoreRef = useRef()
    const scoreToIncrementRef = useRef()

    // Permet de déterminer si on retire ou ajoute des points, false ça en perd, true ça en gagne
    const determineWinOrLoose = (scoreQuizz) => {
        const result = (scoreQuizz * 100) / (numberOfQuestion * 10)
        if(result >= 50){
            return true
        }
        return false
    }
    
    // Pour calculer les informations nécessaire à l'affichage du score
    const calculQuizzInformations = () => {
        const userName = params.userName
        const userScore = getScore(userName) // Score de l'utilisateur
        const trueScore = quizzScore // Score en cas de victoire
        const wrongScore = -((numberOfQuestion * 10) - quizzScore) // Score en cas de défaite
        
        const win = determineWinOrLoose(quizzScore) // Détermine si le joueur gagne ou perd des points
        const styleColor = win ? {color:"rgb(27, 111, 144)"} : {color:"rgb(136, 15, 15)"} // La couleur des numéros selon la victoire
        const logoToShow = win ? <i style={{color:"rgb(13, 75, 120)"}} className="fa-solid fa-arrow-trend-up"/> : <i style={{color:"rgb(136, 15, 15)"}} className="fa-solid fa-arrow-trend-down"></i> // Logo a afficher selon la victoire

        const payloadNewScore = win ? userScore + trueScore : userScore + wrongScore // Le nouveau score à sauvegarder

        dispatch(updateQuizzScoreInformation({ // Le setState nécessaire pour pouvoir afficher les informartions dans le composant QuizzScore
            oldScoreToShow: userScore,
            quizzScoreToShow: win ? trueScore : wrongScore,
            newScoreToShow: payloadNewScore,
            poucentOfCorrectAnswer: ((quizzScore * 100) / (numberOfQuestion * 10)).toFixed(),
            differenceBetweenScore: payloadNewScore < 0 ? -userScore : win ? trueScore : wrongScore, // Mdr le ternaire
            styleColor,
            logoToShow,
            win,
        }))
        dispatch(updateScore({userName, newScore:payloadNewScore})) // La sauvegarde du nouveau score
    }

    const injectIncrementScoreAnimation = (scoreToIncrementRef) => {
        if(quizzScoreInformation){
            let frame = 50 / (Math.abs(quizzScoreInformation?.differenceBetweenScore) / 10)
            if(frame === Infinity){frame = 50}
            
            const intervalID = setInterval(() => {
                setScoreToShow(current => {
                    const controlValue = quizzScoreInformation.newScoreToShow < 0 ? 0 : quizzScoreInformation.newScoreToShow
                    if(current === controlValue){
                        injectClassAnimationForRefInTimeOut([{ref:scoreToIncrementRef, class:"newScoreAnimation", delay:0}])
                        clearInterval(intervalID)
                        return current
                    }
                    if(quizzScoreInformation.win){
                        return current + 1
                    }else{
                        return current - 1
                    }
                })
            }, frame);
        }
    }


    useEffect(() => {
        if(control){
            setScoreToShow(quizzScoreInformation?.oldScoreToShow)
            const tableauOfRefs = [
                {ref : pourcentCorrectAnswerRef, delay: 500},
                {ref : quizzScoreRef},
                {ref : starScoreRef},
                {ref : logoScoreRef}
            ]
    
            injectStyleForRefInTimeOut(
                tableauOfRefs,
                () => injectIncrementScoreAnimation(scoreToIncrementRef.current.classList)
            );
        }
        
        return(() => {
            setControl(false) //
        })

    }, [quizzScoreInformation])
    

    return{
        calculQuizzInformations,
        injectIncrementScoreAnimation,
        setScoreToShow,
        scoreToShow,
        pourcentCorrectAnswerRef,
        quizzScoreRef,
        starScoreRef,
        logoScoreRef,
        scoreToIncrementRef,
    }
}