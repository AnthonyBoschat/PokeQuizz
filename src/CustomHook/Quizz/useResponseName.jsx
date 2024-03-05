import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIndexSelected, updateInputSearchValue, updateReadyToSubmit, updateSuggestionList, updateTimerFreeze, updateUserHaveSuggestion } from "../../Redux/Slices/Quizz/QuizzResponseSlice";
import { incrementIndex, incrementQuizzScore, updateExactPokemonsAnswer, updatePokemonsAnswer, updateQuizzEnd, updateQuizzResponse } from "../../Redux/Slices/Quizz/QuizzSlices";
import { updateButtonClicked } from "../../Redux/Slices/ClickedSlices";

export default function useResponseName(){

    const dispatch = useDispatch()
    const inputSearchValue = useSelector(store => store.quizzResponse.inputSearchValue)
    const pokemonsList = useSelector(store => store.pokemons.pokemonsList)
    const suggestionList = useSelector(store => store.quizzResponse.suggestionList)
    const indexSelected = useSelector(store => store.quizzResponse.indexSelected)
    const userHaveSuggestion = useSelector(store => store.quizzResponse.userHaveSuggestion)
    const readyToSubmit = useSelector(store => store.quizzResponse.readyToSubmit)
    const pokemonsOfQuizz = useSelector(store => store.quizz.pokemonsOfQuizz)
    const indexOfQuizz = useSelector(store => store.quizz.indexOfQuizz)
    const quizzResponse = useSelector(store => store.quizz.quizzResponse)
    const numberOfQuestion = useSelector(store => store.parameters.numberOfQuestion)
    const quizzStart = useSelector(store => store.quizz.quizzStart)
    const quizzEnd = useSelector(store => store.quizz.quizzEnd)
    const inputRef = useRef()
    const selectedRef = useRef()


    const changeIndex = (ref) => {
        if(indexOfQuizz === numberOfQuestion - 1){ // S'il n'y a plus de pokemon à présenter
            ref.current.classList.remove("box-smooth-apparition")
            ref.current.classList.add("box-smooth-disparition")
            ref.current.addEventListener("animationend", () => {
                dispatch(updateQuizzEnd(true))
                dispatch(updateButtonClicked(false))
                dispatch(updateInputSearchValue(""))
            })
            
            return
        }else{
            dispatch(incrementIndex())
            dispatch(updateButtonClicked(false))
            dispatch(updateInputSearchValue(""))
        }
    }

    // Soumettre la réponse de l'utilisateur
    const submitResponse = (userHaveSuggestion, pokemonName, quizzOnRef) => {
        if(userHaveSuggestion){ // Si l'utilisateur avait des suggestion, on annule ( sert à placer la suggestion dans la boite )
            return
        }
        else{ // Sinon
            // dispatch(updateTimerFreeze(true))
            compareResponse(pokemonName, quizzOnRef)
        }
    }


    // Quand l'utilisateur soumet une réponse
    const handleInteractSuggestion = (pokemonName, e, quizzOnRef) => {
        e.preventDefault() // On annule le rechargement de la page
        dispatch(updateInputSearchValue(pokemonName)) // On setState la valeur de l'input
        dispatch(updateUserHaveSuggestion(false)) // On annuler le visionnage des suggestions
        dispatch(updateSuggestionList(null)) // On remet la liste des pokemons à suggérer à null
        submitResponse(userHaveSuggestion, pokemonName, quizzOnRef) // On compare les réponses
    }

    const handleChangeAnswer = (inputRef) => {
        const payload = inputRef?.current?.value != "" ? true : false
        dispatch(updateUserHaveSuggestion(payload))
        dispatch(updateIndexSelected(-1))
        dispatch(updateInputSearchValue(inputRef.current.value))
    }

    const searchSuggestion = (inputSearchValue) => {
        const ArrayOfSuggestion = pokemonsList.filter(pokemon => {
            const pokemonName = pokemon.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") // .normalize pour les accents
            const value = inputSearchValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            if(pokemonName.startsWith(value)){return true}
            else{return false}}
        )
        dispatch(updateSuggestionList(ArrayOfSuggestion))
    }


    const navigate = (e, selectedRef) => {
        
        if(suggestionList){
            switch(e.key){
                case "ArrowDown":
                    if(indexSelected < suggestionList.length - 1){
                        const payload = indexSelected + 1
                        dispatch(updateIndexSelected(payload))
                        return
                    }else{
                        return
                    }

                case "Tab":
                    e.preventDefault()
                    if(indexSelected < suggestionList.length - 1){
                        const payload = indexSelected + 1
                        dispatch(updateIndexSelected(payload))
                        return
                    }else{
                        return
                    }

                case "ArrowUp":
                    if(indexSelected > -1){
                        e.preventDefault()
                        const payload = indexSelected - 1
                        dispatch(updateIndexSelected(payload))
                        inputRef.current.setSelectionRange(inputSearchValue.length,inputSearchValue.length)
                        return
                    }

                case "Enter":
                    if(selectedRef.current){
                        handleInteractSuggestion(selectedRef.current.innerHTML, e)
                    }
                    if(suggestionList.length === 1){
                        dispatch(updateInputSearchValue(suggestionList[0].name))
                    }
                    return

                default:
                    return
            }
        }
    }


    const generateSuggestion = (pokemon, index, selectedRef, quizzOnRef) => {
        const selected = index === indexSelected ? "suggestionSelected" : ""
        const ref = index === indexSelected ? selectedRef : null
        return(
            <div onClick={(e) => handleInteractSuggestion(pokemon.name, e, quizzOnRef)} className={`suggestionBox ${selected}`} key={pokemon.name}>
                <span ref={ref} className="suggestionName">{pokemon.name}</span>
            </div>
        )
    }

    const getStyle = (pokemonName) => {
        if(quizzResponse){
            return(pokemonName === pokemonsOfQuizz[indexOfQuizz].name ? {backgroundColor:"rgba(27, 111, 144, 0.347)"} : {backgroundColor:"rgba(187, 38, 43, 0.378)"})
        }
    }

    const timeoutTriggerID = useSelector(store => store.quizzResponse.timeoutTriggerID)

    const compareResponse = (pokemonName, quizzOnRef) => {
        if(pokemonName.toLowerCase() === pokemonsOfQuizz[indexOfQuizz].name.toLowerCase()){
            dispatch(incrementQuizzScore())
            dispatch(updatePokemonsAnswer({name:pokemonsOfQuizz[indexOfQuizz].name, win:true}))
        }else{
            dispatch(updatePokemonsAnswer({name:pokemonsOfQuizz[indexOfQuizz].name, win:false}))
        }
        dispatch(updateButtonClicked(true))
        dispatch(updateQuizzResponse(true))
        clearTimeout(timeoutTriggerID)
        setTimeout(() => {
            changeIndex(quizzOnRef)
        }, 1000);
    }

    useEffect(() => {
        searchSuggestion(inputSearchValue)
    }, [inputSearchValue])


    useEffect(() => {
        if(inputRef?.current){
            const handleKeyDown = (e) => navigate(e, selectedRef)
            inputRef?.current?.addEventListener("keydown", handleKeyDown)

            return(() => {inputRef?.current?.removeEventListener("keydown", handleKeyDown)})
        }
    }, [suggestionList,indexSelected])

    useEffect(() => {
        if(selectedRef.current){
            selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }, [indexSelected])

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus()
        }
    }, [indexOfQuizz])

    useEffect(() => { // Rend invisible la réponse au quizz quand l'index change ouq ue le quizz Démarre
        if(quizzStart && !quizzEnd){
            dispatch(updateQuizzResponse(false))
        }
    }, [quizzStart, indexOfQuizz])


    return{
        submitResponse,
        handleChangeAnswer,
        navigate,
        generateSuggestion,
        handleInteractSuggestion,
        inputRef,
        selectedRef,
        getStyle,
    }
}