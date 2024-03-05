import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateNumberOfQuestion } from "../../Redux/Slices/GlobalParameterSlices";
import useUsers from "../../CustomHook/useUsers";
import useLifeCycle from "../../CustomHook/Quizz/useLifeCycle";

function Header(){

    const pokemonsList = useSelector(store => store.pokemons.pokemonsList)
    const numberOfQuestion = useSelector(store => store.parameters.numberOfQuestion)
    const params = useParams()
    const {getScore} = useUsers()
    const {resetQuizzFull} = useLifeCycle()
    const dispatch = useDispatch()

    const parameterNumberOfQuestionRed = useRef() //

    useEffect(() => {
        dispatch(updateNumberOfQuestion(parameterNumberOfQuestionRed.current.value))
    }, [numberOfQuestion])


    return(
        <header>


            <select ref={parameterNumberOfQuestionRed} defaultValue={"3"} onChange={(e) => dispatch(updateNumberOfQuestion(e.target.value))} name="" id=""> 
                <option value="10">10</option>
                <option value="5">5</option>
                <option value="3">3</option>
                <option value="1">1</option>
            </select>

            


            <div className="headerButtonBox">
                <div className="profilScore">
                    <i className="fa-solid fa-star"></i>
                    <span>{getScore(params.userName)}</span>
                </div>
                <Link className="navButton" to="./accueil"><button>Accueil</button></Link>
                <Link className="navButton" to="./quizz"><button onClick={resetQuizzFull} disabled={!pokemonsList}>Quiz</button></Link>
                <Link className="navButton" to="./statistique"><button disabled={!pokemonsList}>Statistiques</button></Link>
            </div>
        </header>
    )
}

export default Header;