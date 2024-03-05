import {createSlice} from "@reduxjs/toolkit"

const QuizzResponseSlice = createSlice({
    name:"quizzResponse",
    initialState:{
        userHaveSuggestion:false,
        inputSearchValue:"",
        suggestionList:null,
        indexSelected:-1,
        timerFreeze:false,
        timerEnd:false,
        timeoutTriggerID:null,
        indexQuizSelected:null, // Le quiz qui est selectionner
        typeSelected:[], // Les types sélectionner par le joueur pour le quizz Type
        answerType:[]
    },
    reducers:{
        updateTimerEnd:(state,action) => {
            state.timerEnd = action.payload
        },
        updateUserHaveSuggestion:(state,action) => {
            state.userHaveSuggestion = action.payload
        },
        updateIndexSelected:(state,action) => {
            state.indexSelected = action.payload
        },
        updateInputSearchValue:(state,action) => {
            state.inputSearchValue = action.payload
        },
        updateSuggestionList:(state,action) => {
            state.suggestionList = action.payload
        },
        updateTimerFreeze:(state, action) => {
            state.timerFreeze = action.payload
        },
        updateTimeoutTriggerID:(state, action) => {
            state.timeoutTriggerID = action.payload
        },
        updateIndexQuizSelected:(state, action) => {
            state.indexQuizSelected = action.payload
        },
        addTypeSelected:(state, action) => {
            state.typeSelected.push(action.payload)
        },
        deleteTypeSelected:(state, action) => {
            state.typeSelected.splice(action.payload, 1)
        },
        resetTypeSelected:(state,action) => {
            state.typeSelected = []
        },
        updateAnswerType:(state,action) => {
            state.answerType = action.payload
        },
        resetQuizzResponseSlice:(state,action) => {
            return state = {
                userHaveSuggestion:false,
                inputSearchValue:"",
                suggestionList:null,
                indexSelected:-1,
                timerFreeze:false,
                timeoutTriggerID:null,
                indexQuizSelected:null,
                typeSelected:[],
            }
        }
    },
})

export const QuizzResponseSliceReducer = QuizzResponseSlice.reducer
export const {
    updateTimerEnd,
    updateUserHaveSuggestion,
    updateIndexSelected,
    updateInputSearchValue,
    updateSuggestionList,
    updateTimerFreeze,
    updateTimeoutTriggerID,
    updateIndexQuizSelected,
    addTypeSelected,
    deleteTypeSelected,
    resetQuizzResponseSlice,
    updateAnswerType,
    resetTypeSelected
} = QuizzResponseSlice.actions