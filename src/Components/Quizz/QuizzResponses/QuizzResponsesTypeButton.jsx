import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTypeSelected, deleteTypeSelected } from "../../../Redux/Slices/Quizz/QuizzResponseSlice";
import useResponseType from "../../../CustomHook/Quizz/useResponseType";

function QuizzResponsesTypeButton({type}){

    
    const typeSelected = useSelector(store => store.quizzResponse.typeSelected)
    const buttonClicked = useSelector(store => store.clicked.buttonClicked)
    const {selectType} = useResponseType()


    const thisTypeIsSelected = typeSelected.includes(type)
    const typeSelectedClass = thisTypeIsSelected ? "typeSelected" : ""

    return(
        <button disabled={buttonClicked} onClick={() => selectType(type)} className={`typeButton ${type} ${typeSelectedClass}`}>{type}</button>
    )
}

export default QuizzResponsesTypeButton;