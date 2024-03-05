import React, {useRef} from "react";
import { Link, useNavigate } from "react-router-dom"
import useLog from "../../CustomHook/useLog";
import { useDispatch} from "react-redux";
import { changeSecure } from "../../Redux/Slices/SecureSlices";

function Authentication() {

    const navigate = useNavigate()
    const userNameRef = useRef()
    const userCodeRef = useRef()
    const {handleLogin} = useLog()
    const dispatch = useDispatch()

    


    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {userName:userNameRef.current.value, userCode:userCodeRef.current.value}
        const result = handleLogin(payload)
        if(result){
            dispatch(changeSecure(true))
            navigate(`application/${payload.userName}/accueil`)
        }
    }

    return (
        <div className="authenticationOverlay">
            <div className="authenticationBox">
                <form onSubmit={(e) => handleSubmit(e)} action="">
                    <input ref={userNameRef} placeholder="Nom d'utilisateur" type="text" />
                    <input ref={userCodeRef} placeholder="Code d'authentification" type="password" />
                    <input value="Se connecter" type="submit" />
                    <div>Pas encore de compte ? <Link to={"inscription"}>Créé un compte</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Authentication;