import { useDispatch, useSelector } from "react-redux";
import {resetQuizz, updateQuizzStart, updatePokemonsOfQuizz} from "../../Redux/Slices/Quizz/QuizzSlices";
import { resetQuizzResponseSlice } from "../../Redux/Slices/Quizz/QuizzResponseSlice";

export default function useLifeCycle(){

    const pokemonsList = useSelector(store => store.pokemons.pokemonsList) // L'index du pokemon à afficher
    const numberOfQuestion = useSelector(store => store.parameters.numberOfQuestion)
    const quizzScoreInformation = useSelector(store => store.quizz.quizzScoreInformation)
    
    // const {injectClassAnimationForRefInTimeOut} = useAnimation()
    const dispatch = useDispatch()
    
    // Pour démarrer le quizz
    const startQuizz = () => {
        dispatch(updateQuizzStart(true))
    }

    // Génère la liste de pokémons nécessaire pour le quizz
    const getRandomPokemons = () => { 
        if(pokemonsList){
            const newArray = []
            for(let i = 0; i < numberOfQuestion; i++){
                const randomIndex = Math.floor(Math.random() * pokemonsList.length)
                if(pokemonsList[randomIndex].image){
                    // Verification que le pokemon n'a pas déjà été push
                    const verificationPokemonAlreadyGenerated = newArray.find(pokemon => pokemon.name === pokemonsList[randomIndex].name)
                    if(!verificationPokemonAlreadyGenerated){
                        newArray.push({...pokemonsList[randomIndex]})
                    }else{
                        i--
                    }
                }else{
                    i--
                }
                
            }
            dispatch(updatePokemonsOfQuizz(newArray)) // On state la liste des pokemons du quizz nouvellement généré
        }
    }

    // Sert à reset le quizz quand le bouton de navigation QUIZZ est cliquer
    const resetQuizzFull = () => {
        dispatch(resetQuizz()) // On remet le state par défaut, on le vide des informations
        dispatch(resetQuizzResponseSlice())
        getRandomPokemons() // On génère de nouveaux pokemon
    }

    return{
        getRandomPokemons,
        startQuizz,
        resetQuizzFull,
        quizzScoreInformation,
    }
}