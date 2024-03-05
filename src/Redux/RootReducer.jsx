import { combineReducers } from "@reduxjs/toolkit"
import { UsersSliceReducer } from "./Slices/UsersSlices"
import { SecureSliceReducer } from "./Slices/SecureSlices"
import { pokemonsSliceReducer } from "./Slices/PokemonsSlices"
import { GlobalParameterReducer } from "./Slices/GlobalParameterSlices"
import { ClickedSliceReducer } from "./Slices/ClickedSlices"
import { QuizzResponseSliceReducer } from "./Slices/Quizz/QuizzResponseSlice"
import { QuizzSliceReducer } from "./Slices/Quizz/QuizzSlices"
import { QuizzHistoryReducer } from "./Slices/Quizz/QuizzHistorySlices"

const rootReducer = combineReducers({
    users: UsersSliceReducer,
    secure: SecureSliceReducer, // Ajouter les sliceReducer voulu
    pokemons: pokemonsSliceReducer,
    parameters: GlobalParameterReducer,
    quizz: QuizzSliceReducer, // Ajouter les sliceReducer voulu
    quizzHistory:QuizzHistoryReducer,
    clicked:ClickedSliceReducer,
    quizzResponse:QuizzResponseSliceReducer
})

export default rootReducer