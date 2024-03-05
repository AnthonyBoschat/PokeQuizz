import {createSlice} from "@reduxjs/toolkit"

const GlobalParameter = createSlice({
    name:"parameters",
    initialState:{
        numberOfQuestion:10,
        duryQuizzQuestion:10
    },
    reducers:{
        updateNumberOfQuestion:(state, action) => {
            state.numberOfQuestion = action.payload
        }
    },
})

export const GlobalParameterReducer = GlobalParameter.reducer
export const {updateNumberOfQuestion} = GlobalParameter.actions