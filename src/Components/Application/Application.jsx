import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate} from "react-router-dom";
import Header from "./Header";

function Application(){

    const navigate = useNavigate()
    const secure = useSelector(store => store.secure)

    useEffect(() => {
        if(!secure){
            navigate("/")
        }
    }, [])

    return(
        <>
            <div className="application">
                <Header/>
                <div className="featureBox">
                    <Outlet/>
                </div> 
            </div>
        </>
    )
}

export default Application;