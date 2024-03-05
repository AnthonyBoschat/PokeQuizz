import {createSlice} from "@reduxjs/toolkit"

const localStorageQuizzHistory = JSON.parse(localStorage.getItem("usersHistory"))

const QuizzHistory = createSlice({
    name:"quizzHistory",
    initialState:localStorageQuizzHistory ? localStorageQuizzHistory : [],
    reducers:{
        initiateUserHistory:(state, action) => {
            state.push(action.payload)
        },
        addQuizzHistory:(state, action) => {
            const userName = action.payload.userName
            const thisUser = state.find(user => user.userName === userName)
            thisUser.history.push(action.payload.history)
        },
        deleteFirstHistory:(state,action) => {
            const userName = action.payload.userName
            const thisUser = state.find(user => user.userName === userName)
            thisUser.history.shift()
        }
    },
})

export const QuizzHistoryReducer = QuizzHistory.reducer
export const {initiateUserHistory, addQuizzHistory, deleteFirstHistory} = QuizzHistory.actions