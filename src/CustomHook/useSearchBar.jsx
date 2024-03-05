import { useDispatch, useSelector } from "react-redux";
import { updatePokemonsToShow } from "../Redux/Slices/PokemonsSlices";

export default function useSearchBar(){
    const pokemonsList = useSelector(state => state.pokemons.pokemonsList)
    const dispatch = useDispatch()

    // Affiche la liste des pokemons à afficher selon la valeur dans la barre de recherche
    const filterPokemonsToShow = (e) => {
        let newArray

        if(e.target.value === ""){
            newArray = []
        }
        else{
            newArray = pokemonsList.filter(pokemon => {
                const pokemonName = pokemon.name.toLowerCase()
                if(pokemonName.startsWith(e.target.value.toLowerCase())){return true}
                return false // hum
            })
        }
        
        dispatch(updatePokemonsToShow(newArray))
    }

    return{filterPokemonsToShow}
}