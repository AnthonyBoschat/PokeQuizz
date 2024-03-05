import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUsers from "../../CustomHook/useUsers";
import { useDispatch, useSelector } from "react-redux";
import { changeSecure } from "../../Redux/Slices/SecureSlices";

function CodeGiver(){

    const secure = useSelector(state => state.secure)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const {findToken} = useUsers()
    const code = findToken(location)

    useEffect(() => {
        if(!secure){
            navigate("/")
        }
    }, [])

    const handleClickConnection = () => {
        dispatch(changeSecure(false))
        navigate("/")
    }


    return(
        <div className="codeGiverOverlay">
            <div className="codeGiverBox">
                <span>Votre code qui vous servira à vous connecter</span>
                <span className="giver">{code}</span>
                <button onClick={() => handleClickConnection()}>Se connecter</button>
            </div>
        </div>
    )
}

export default CodeGiver;