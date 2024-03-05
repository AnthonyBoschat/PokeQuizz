import React, { useEffect } from "react";
import { addTypeSelected, deleteTypeSelected } from "../../Redux/Slices/Quizz/QuizzResponseSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateQuizzResponse } from "../../Redux/Slices/Quizz/QuizzSlices";

export default function useResponseType(){

    const dispatch = useDispatch()
    const typeSelected = useSelector(store => store.quizzResponse.typeSelected)
    const answerType = useSelector(store => store.quizzResponse.answerType)

    // List de tout les types
    const ListOfType = [ 
        "Feu",
        "Plante",
        "Eau",
        "Normal",
        "Poison",
        "Vol",
        "Insecte",
        "Électrik",
        "Sol",
        "Psy",
        "Fée",
        "Combat",
        "Roche",
        "Glace",
        "Spectre",
        "Dragon",
        "Ténèbres",
        "Acier",
    ]

    // Quand l'utilisateur clique sur un type
    const selectType = (type) => {
        if(typeSelected.includes(type)){
            const index = typeSelected.indexOf(type)
            dispatch(deleteTypeSelected(index))
            return
        }
        if(typeSelected.length === 2){
            return
        }
        dispatch(addTypeSelected(type))
    }

    const compareResponseType = () => {
        if(typeSelected.length === answerType.length){
            const triArray1 = typeSelected.slice().sort()
            const triArray2 = answerType.slice().sort()
            for(let i = 0; i < triArray1.length; i++){
                if(triArray1[i] !== triArray2[i]){
                    console.log("Défaite")
                    return
                }
            }
            console.log("Victoire")
            return
        }else{
            console.log("Défaite")
            return
        }
    }

    

    return{
        ListOfType,
        selectType,
        compareResponseType
    }
}