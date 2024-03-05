import React from "react";
import useResponseType from "../../../CustomHook/Quizz/useResponseType";

function QuizzResponsesTypeValidate(){

    const {compareResponseType} = useResponseType()

    return(
        <i style={{visibility:"hidden"}} onClick={compareResponseType} className="fa-solid fa-circle-check"></i>
    )
}

export default QuizzResponsesTypeValidate;