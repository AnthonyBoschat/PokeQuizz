import {createSlice} from "@reduxjs/toolkit"


const pokemonsSlice = createSlice({
    name:"pokemons",
    initialState:{
        pokemonsList:null,
        pokemonsToShow:[],
    },
    reducers:{
        updatePokemonsList:(state, action) => {
            state.pokemonsList = action.payload
        },
        updatePokemonsToShow:(state, action) => {
            state.pokemonsToShow = action.payload
        },
    },
})

export const pokemonsSliceReducer = pokemonsSlice.reducer
export const {updatePokemonsList, updatePokemonsToShow} = pokemonsSlice.actions