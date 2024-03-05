import {createSlice} from "@reduxjs/toolkit"

const SecureSlice = createSlice({
    name:"secure",
    initialState:false,
    reducers:{
        changeSecure:(state, action) => {
            return state = action.payload
        }
    },
})

export const SecureSliceReducer = SecureSlice.reducer
export const {changeSecure} = SecureSlice.actions