import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementIndex, updatePokemonsAnswer, updateQuizzEnd, updateQuizzResponse } from "../../Redux/Slices/Quizz/QuizzSlices";
import { updateButtonClicked } from "../../Redux/Slices/ClickedSlices";
import { resetTypeSelected, updateAnswerType } from "../../Redux/Slices/Quizz/QuizzResponseSlice";

export default function useTime(){

    const dispatch = useDispatch()
    const pokemonsOfQuizz = useSelector(store => store.quizz.pokemonsOfQuizz) // La list des pokemons du quizz
    const numberOfQuestion = useSelector(store => store.parameters.numberOfQuestion) // le nombre de question pour le quizz
    const indexOfQuizz = useSelector(store => store.quizz.indexOfQuizz) // le nombre de question pour le quizz
    const typeSelected = useSelector(store => store.quizzResponse.typeSelected)
    const timeRef = useRef()

    const triggerQuizzResponse = (quizzOnRef, indexQuizSelected) => {
        switch(indexQuizSelected){
            case 0:
                triggerQuizName(quizzOnRef)
                return
            case 1:
                triggerQuizType(quizzOnRef)
            default:
                return
        }
    }


    const triggerQuizName = (quizzOnRef) => {
        dispatch(updatePokemonsAnswer({name:pokemonsOfQuizz[indexOfQuizz].name, win:false}))
        dispatch(updateButtonClicked(true))
        dispatch(updateQuizzResponse(true))
        setTimeout(() => {
            if(indexOfQuizz === numberOfQuestion - 1){
                quizzOnRef.current.classList.remove("box-smooth-apparition")
                quizzOnRef.current.classList.add("box-smooth-disparition")
                quizzOnRef.current.addEventListener("animationend", () => {
                    dispatch(updateQuizzEnd(true))
                    dispatch(updateButtonClicked(false))
                })
            }else{
                dispatch(incrementIndex())
                dispatch(updateButtonClicked(false))
            }
        }, 1000);
    }

    const triggerQuizType = (quizzOnRef) => {
        dispatch(updatePokemonsAnswer({name:pokemonsOfQuizz[indexOfQuizz].name, win:false}))
        dispatch(updateButtonClicked(true))
        dispatch(updateQuizzResponse(true))
        setTimeout(() => {
            dispatch(resetTypeSelected())
            if(indexOfQuizz === numberOfQuestion - 1){
                quizzOnRef.current.classList.remove("box-smooth-apparition")
                quizzOnRef.current.classList.add("box-smooth-disparition")
                quizzOnRef.current.addEventListener("animationend", () => {
                    dispatch(updateQuizzEnd(true))
                    dispatch(updateButtonClicked(false))
                })
            }else{
                dispatch(incrementIndex())
                dispatch(updateButtonClicked(false))
            }
        }, 1000);
    }

    const freezeTimeBar = (widthToFreeze, timeRef) => {
        timeRef.current.classList.remove("time-disapear")
        timeRef.current.style.width = widthToFreeze + "px"
    }


    return{
        triggerQuizzResponse,
        timeRef,
        freezeTimeBar,
    }
}