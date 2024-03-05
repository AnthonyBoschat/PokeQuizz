import {createSlice} from "@reduxjs/toolkit"

const ClickedSlice = createSlice({
    name:"clicked",
    initialState:{
        buttonClicked:false,
        visibility:false
    },
    reducers:{
        updateButtonClicked:(state, action) => {
            state.buttonClicked = action.payload
        },
        updateVisibility:(state,action) => {
            state.visibility = action.payload
        }
    },
})

export const ClickedSliceReducer = ClickedSlice.reducer
export const {updateButtonClicked, updateVisibility} = ClickedSlice.actions