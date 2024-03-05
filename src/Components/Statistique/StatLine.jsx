import React from "react";

function StatLine({user, userName, orderedUsers, playerLineRef, handleClickChangeHistory, currentUserVision}){

    const className = currentUserVision.userName === user.name ? "playerScore userSelected" : "playerScore"
    const backgroundStyle = userName === user.name ? {backgroundColor:"rgba(2, 159, 187, 0.575)"} : null
    const position = orderedUsers.findIndex(userName => userName.name === user.name)
    

    return(
        <div onClick={() => handleClickChangeHistory(user.name)} ref={userName === user.name ? playerLineRef : null} style={backgroundStyle} className={className}>
            <span className="playerScoreBox">
                <i className="playerScoreHearthIcon fa-solid fa-star"></i>
                <span className="playerScoreValue">{user?.score}</span>
            </span>
            <span className="playerName">{user?.name}</span>
            <span className="playerRankBox">
                <span className="playerRank">
                    {position + 1}
                </span>
            </span>
        </div>
    )
}

export default StatLine;