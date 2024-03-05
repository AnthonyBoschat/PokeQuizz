import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useHistory from "../../CustomHook/useHistory";
import useScore from "../../CustomHook/Quizz/useScore";

function QuizzScore(){

    const quizzScoreInformation = useSelector(store => store.quizz.quizzScoreInformation)
    const {saveHistory} = useHistory()
    const {
        calculQuizzInformations,
        scoreToShow,
        pourcentCorrectAnswerRef,
        quizzScoreRef,
        starScoreRef,
        logoScoreRef,
        scoreToIncrementRef,
    } = useScore()
    let control = true

    useEffect(() => {
        if(control){
            calculQuizzInformations()
            saveHistory()
        }
        
        return(() => control = false)
    }, [])
    
    return(
        <div className="quizzScoreOverlay">
            <div className="quizzScoreDisplay">
                <div className="quizzScoreBox">
                    <div ref={pourcentCorrectAnswerRef} className="pourcentCorrectAnswer">
                        Taux de réussite : <span style={quizzScoreInformation?.styleColor}>{quizzScoreInformation?.poucentOfCorrectAnswer} %</span>
                    </div>
                    <div ref={quizzScoreRef} className="quizzScore">
                        Score : <span style={quizzScoreInformation?.styleColor}>{quizzScoreInformation?.quizzScoreToShow}</span>
                    </div>
                    <div ref={starScoreRef} className="starScore">
                        <i className="fa-solid fa-star"></i>
                        <span ref={scoreToIncrementRef} style={quizzScoreInformation?.styleColor}>{scoreToShow}</span>
                    </div>
                </div>
                <div className="quizzLogoBox">
                    <div ref={logoScoreRef} className="logoEnglobe">
                        {quizzScoreInformation?.logoToShow}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizzScore;