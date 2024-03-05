import React, { useState } from "react";
import QuizzResponsesTypeButton from "./QuizzResponsesTypeButton";
import { useSelector } from "react-redux";
import useResponseType from "../../../CustomHook/Quizz/useResponseType";
import QuizzResponsesTypeValidate from "./QuizzResponsesTypeValidate";

function QuizzResponsesType({quizzOnRef}){

    const typeSelected = useSelector(store => store.quizzResponse.typeSelected)
    const  {ListOfType} = useResponseType()

    return(
        <div className="quizzResponsesTypeBox">
            <div className="userTypeSelectionBox">
                {typeSelected.map(type  => <QuizzResponsesTypeButton key={type} type={type}/>)}
                {typeSelected.length > 0 && (<QuizzResponsesTypeValidate/>)}
            </div>
            <div className="typeListDisplay">
                <div className="typeListBox">
                    {ListOfType.map(type  => <QuizzResponsesTypeButton key={type} type={type}/>)}
                </div>
            </div>
        </div>
    )
}

export default QuizzResponsesType;