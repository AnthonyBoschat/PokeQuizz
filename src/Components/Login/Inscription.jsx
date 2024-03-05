import React, {} from "react";
import {Link} from "react-router-dom"
import useUsers from "../../CustomHook/useUsers";

function Inscription(){
    
    const {submitNewUsers, inputUserName} = useUsers()

    return(
        <div className="inscriptionOverlay">
            <Link className="back" to="/">Retour</Link>
            <form onSubmit={(e) => submitNewUsers(e)} action="">
                <input ref={inputUserName} placeholder="Nom d'utilisateur" type="text" />
                <input type="submit" value="S'inscrire" />
            </form>
        </div>
    )
}

export default Inscription;