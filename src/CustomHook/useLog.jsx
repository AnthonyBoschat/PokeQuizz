import { useSelector } from "react-redux";

export default function useLog(){

    const users = useSelector(state => state.users)

    // Verifie si l'utilisateur peut se connecter
    const handleLogin = ({userName, userCode}) => {
        try{
            // On cherche dans les users, l'objet qui possède ce nom
            const user = users.find(user => user.name === userName)
            if(!user){throw new Error("Nom d'utilisateur inconnu")}
            if(user.token !== userCode){throw new Error("Code Inconnu")}
            return true
        }catch(erreur){
            window.alert("Nom d'utilisateur ou code d'authentification incorrecte")
            return false
        }
    }

    return{handleLogin}
}