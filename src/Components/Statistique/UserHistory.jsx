import React from "react";
import UserHistoryLine from "./UserHistoryLine";

function UserHistory({currentUserVision}){


    const thisUserHistory = [...currentUserVision.history].reverse()
    let key = 0
    

    return(
        <div className="historyBox">
            <div className="historyLineBox">
                {thisUserHistory.map(historic => {
                    key++
                    return(<UserHistoryLine key={key} historic={historic}/>)
                })}
            </div>
        </div>
    )
}

export default UserHistory;