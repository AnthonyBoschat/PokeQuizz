import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import StatLine from "./StatLine";
import { useParams } from "react-router-dom";
import useHistory from "../../CustomHook/useHistory";
import UserHistory from "./UserHistory";
import useStats from "../../CustomHook/useStats";


function Statistique(){

    const users = useSelector(store => store.users)
    const params = useParams()
    const {filterUsers} = useStats()
    const {handleClickChangeHistory, currentUserVision} = useHistory()
    const orderedUsers = filterUsers(users)
    const playerLineRef = useRef()
    const playerBoxRef = useRef()

    const userName = params.userName

    useEffect(() => {
        playerLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [])



    return(
        <div className="statsOverlay">
            <div className="statsBox">
                <div ref={playerBoxRef} className="playerStatsBox">
                    {orderedUsers.map(user => 
                    <StatLine 
                    handleClickChangeHistory={handleClickChangeHistory} 
                    key={user.name} 
                    playerLineRef={playerLineRef} 
                    orderedUsers={orderedUsers} 
                    user={user} 
                    userName={userName} 
                    currentUserVision={currentUserVision}/>)}
                </div>
            </div>
            <UserHistory currentUserVision={currentUserVision}/>
        </div>
    )
}

export default Statistique;