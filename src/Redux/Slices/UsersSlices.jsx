import {createSlice} from "@reduxjs/toolkit"

const localStorageData = JSON.parse(localStorage.getItem("users"))

const UsersSlice = createSlice({
    name:"users",
    initialState: localStorageData ? localStorageData : [],
    reducers:{
        addUsers:(state, action) => {
            state.push(action.payload)
        },
        updateScore:(state, action) => {
            const correctUser = state.find(user => user.name === action.payload.userName)
            const newScore = action.payload.newScore < 0 ? 0 : action.payload.newScore
            correctUser.score = newScore
        }
    },
})

export const UsersSliceReducer = UsersSlice.reducer
export const {addUsers, updateScore} = UsersSlice.actions