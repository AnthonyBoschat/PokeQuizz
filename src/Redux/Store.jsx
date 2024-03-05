import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./RootReducer"

const store = configureStore({
    reducer:rootReducer, // Attention à bien importer le rootReducer plus haut

    middleware: (getDefaultMiddleware) => // Ignorer la serialisation
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store