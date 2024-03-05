import {useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../Redux/Slices/UsersSlices";
import { useNavigate } from "react-router-dom";
import { changeSecure } from "../Redux/Slices/SecureSlices";
import queryString from "query-string";
import { initiateUserHistory } from "../Redux/Slices/Quizz/QuizzHistorySlices";

export default function useUsers(){

    const users = useSelector(store => store.users)
    const quizzHistory = useSelector(store => store.quizzHistory)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const inputUserName = useRef()

    const generateNewToken = () => {
        let token = ""
        let controle = true

        while(controle){
            for(let i = 0; i < 8; i++){
                const randomNumber = Math.floor(Math.random() * 10)
                token += randomNumber
            }
            const resultat = users.find(user => user.token === token)
            if(resultat){token = ""}
            else{controle = false}
        }
        

        return token
    }


    const submitNewUsers = (e) => {
        e.preventDefault()
        const userName = (inputUserName.current.value).trim()
        const userExist = users.find(user => user.name === userName)
        const userNameHaveSpace = /\s/.test(userName)


        if(userName === ""){ // S'il n'y a pas de nom de renseigner
            window.alert("Merci de renseigner un nom d'utilisateur")
            return
        }

        if(userNameHaveSpace){
            window.alert("Attention, le nom d'utilisateur doit être composé d'un seul mot, sans espaces.")
            return
        }
        
        if(userExist){ // Si l'utilisateur existe déjà
            window.alert("Nom d'utilisateur déjà enregistrer, merci d'en choisir un nouveau")
        }
        else{ // Sinon
            const newObject = {
                name:userName,
                token:generateNewToken(),
                score:0
            }
            dispatch(addUsers(newObject)) // On met à jour notre state Users
            dispatch(initiateUserHistory({userName:userName, history:[]}))// On lui créé un nouvel historique
            dispatch(changeSecure(true))
            navigate("../PokeQuizz/codeGiver?userName="+encodeURIComponent(userName))
        }
    }

    const findToken = (location) => {
        const query = queryString.parse(location.search)
        const userName = query.userName
        const currentUser = users.find(user => user.name === userName)
        if(currentUser){
            return currentUser.token
        }else{
            return false
        }
    }

    const getScore = (userName) => {
        const user = users.find(user => user.name === userName)
        return user.score
    }

    


    // Responsable de la sauvegarde dans le localStorage à chaque modification de users
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users))
    }, [users])

    // Responsable de la sauvegarde dans le localStorage à chaque modification de l'historique utilisateur
    useEffect(() => {
        localStorage.setItem("usersHistory", JSON.stringify(quizzHistory))
    }, [quizzHistory])

    return{submitNewUsers, inputUserName, generateNewToken, findToken, getScore}
}