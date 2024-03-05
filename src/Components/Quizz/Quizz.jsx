import React, { useEffect, useRef } from "react";
import QuizzQuestions from "./QuizzQuestions";
import QuizzTime from "./QuizzTime";
import QuizzScore from "./QuizzScore";
import QuizzBar from "./QuizzBar";
import { useDispatch, useSelector } from "react-redux";
import QuizzAnswer from "./QizzAnswer/QuizzAnswer";
import useLifeCycle from "../../CustomHook/Quizz/useLifeCycle";
import useQuizzChoice from "../../CustomHook/Quizz/useQuizzChoice";
import QuizzResponsesAll from "./QuizzResponses/QuizzResponsesAll";
import { updateQuizzResponse, updateQuizzStart } from "../../Redux/Slices/Quizz/QuizzSlices";
import { updateAnswerType } from "../../Redux/Slices/Quizz/QuizzResponseSlice";

function Quizz(){

    const circleRef = useRef()
    const playLogoRef = useRef()
    const quizzOnRef = useRef()
    const {startQuizz, resetQuizzFull} = useLifeCycle()
    const {determineRandomQuizz, saveDataNecessaryForAnswer} = useQuizzChoice()
    const quizzEnd = useSelector(store => store.quizz.quizzEnd)
    const quizzStart = useSelector(store => store.quizz.quizzStart)
    const numberOfQuestion = useSelector(store => store.parameters.numberOfQuestion) // le nombre de question pour le quizz
    const indexOfQuizz = useSelector(store => store.quizz.indexOfQuizz)
    const dispatch = useDispatch()

    const handleClick = () => {
        circleRef.current.classList.add("circle-disparition")
        playLogoRef.current.classList.add("playLogo-disparition")
        setTimeout(() => {
            startQuizz()
        }, 2000);
    }

    // Quand le quizz n'est plus en fonctionnement
    useEffect(() => {
        if(!quizzStart){
            resetQuizzFull()
            determineRandomQuizz()
        }
    }, [quizzStart])

    // Quand on change le nombre de question
    useEffect(() => {
        resetQuizzFull()
    }, [numberOfQuestion])

    // Au chargement du composant,et quand un nouveau pokemon s'affiche
    useEffect(() => {
        const indexQuizzSelected = determineRandomQuizz() // On détermine un nouveau quizz parmis les deux disponibles
        saveDataNecessaryForAnswer(indexQuizzSelected)
    }, [indexOfQuizz])

    useEffect(() => { // Rend invisible la réponse au quizz quand le pokemon afficher change
        if(quizzStart && !quizzEnd){
            dispatch(updateQuizzResponse(false))
        }
    }, [indexOfQuizz])

    

    return(
        <div className="quizzDisplay">
            {!quizzStart && (
                <div className="quizzOff">
                    <span onClick={handleClick} className="startButton">
                        <svg width="20vw" height="20vw">
                            <circle ref={circleRef} cx="50%" cy="50%" r="20%" strokeWidth="3%"/>
                        </svg>
                        <i ref={playLogoRef} className="fa-solid fa-play"></i>
                    </span>
                </div>
            )}
            {(quizzStart && !quizzEnd) && (
                <div ref={quizzOnRef} className="quizzOn box-smooth-apparition">
                    <QuizzBar />
                    <QuizzTime quizzOnRef={quizzOnRef}/>
                    <QuizzQuestions />
                    <QuizzAnswer />
                    <QuizzResponsesAll quizzOnRef={quizzOnRef} />
                </div>
            )}
            {(quizzStart && quizzEnd) && (
                <div className="quizzOn">
                    <QuizzScore/>
                </div>
            )}
        </div>
    )
}

export default Quizz;