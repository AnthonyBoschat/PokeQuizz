import React from "react";
import { useSelector } from "react-redux";
import useResponseName from "../../../CustomHook/Quizz/useResponseName";

function QuizzResponsesName({quizzOnRef}){

    const inputSearchValue = useSelector(store => store.quizzResponse.inputSearchValue)
    const suggestionList = useSelector(store => store.quizzResponse.suggestionList)
    const userHaveSuggestion = useSelector(store => store.quizzResponse.userHaveSuggestion)
    const buttonClicked = useSelector(store => store.clicked.buttonClicked)

    const {
        handleInteractSuggestion,
        handleChangeAnswer,
        generateSuggestion,
        inputRef,
        selectedRef,
        getStyle
    } = useResponseName()

    return(
        <div className="quizzResponsesNameBox">
            <form onSubmit={(e) => handleInteractSuggestion(inputSearchValue, e, quizzOnRef)} className="quizzResponse2Form" action="">
                <div>
                    <input style={getStyle(inputSearchValue)} disabled={buttonClicked} value={inputSearchValue} onChange={() => handleChangeAnswer(inputRef)} className="InputSearch" ref={inputRef} type="text" />
                    {userHaveSuggestion && (<div className="quizzSuggestion">
                        {suggestionList && (suggestionList.map((pokemon, index) => generateSuggestion(pokemon, index, selectedRef, quizzOnRef)))}
                    </div>)}
                </div>
                <input style={{display:"none"}} className="inputSubmit" type="submit" />
            </form>
        </div>
    )
}

export default QuizzResponsesName;