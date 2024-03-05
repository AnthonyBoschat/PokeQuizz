import {createSlice} from "@reduxjs/toolkit"

const QuizzSlice = createSlice({
    name:"quizz",
    initialState:{
        quizzStart:false, // Est-ce que le quizz a commencer
        quizzResponse:false, // Est-ce que les réponse sont visible
        quizzEnd:false, // Est-ce que le quizz est terminer
        quizzScore:0, // le score actuelle du quizz
        pokemonsOfQuizz:[], // La liste des pokémons du quizz
        indexOfQuizz:0, // L'index du pokemon à afficher
        responseOfQuizz:[], // Les réponse de l'utilisateur
        quizzScoreInformation:{}, // Les informations du score nécessaire au calcul
        pokemonsAnswer:[], // Les réponse correctes de l'utilisateur
    },
    reducers:{
        updatePokemonsAnswer:(state, action) => {
            state.pokemonsAnswer.push(action.payload)
        },
        updateQuizzStart:(state,action) => {
            state.quizzStart = action.payload
        },
        updateQuizzResponse:(state,action) => {
            state.quizzResponse = action.payload
        },
        updateQuizzEnd:(state,action) => {
            state.quizzEnd = action.payload
        },
        updateQuizzScoreInformation:(state, action) => {
            state.quizzScoreInformation = action.payload
        },
        updateIncrementScore:(state, action) => {
            state.quizzScoreInformation.oldScoreToShow = action.payload
        },
        incrementQuizzScore:(state,action) => {
            state.quizzScore = state.quizzScore + 10
        },
        updatePokemonsOfQuizz:(state, action) => {
            state.pokemonsOfQuizz = action.payload
        },
        incrementIndex:(state, action) => {
            state.indexOfQuizz = state.indexOfQuizz + 1
        },
        changeIndex:(state, action) => {
            state.indexOfQuizz = action.payload
        },
        updateResponseOfQuizz:(state, action) => {
            state.responseOfQuizz = action.payload
        },
        resetQuizz:(state,action) => {
            return state = {
                quizzStart:false,
                quizzResponse:false,
                quizzEnd:false,
                quizzScore:0,
                pokemonsOfQuizz:[],
                indexOfQuizz:0,
                responseOfQuizz:[],
                pokemonsAnswer:[],
            }
        }
    },
})

export const QuizzSliceReducer = QuizzSlice.reducer
export const {
    updatePokemonsAnswer,
    updateQuizzStart,
    updateQuizzResponse,
    updateQuizzEnd,
    incrementQuizzScore,
    updatePokemonsOfQuizz,
    incrementIndex,
    changeIndex,
    updateResponseOfQuizz,
    resetQuizz,
    updateQuizzScoreInformation,
    updateIncrementScore,
} = QuizzSlice.actions