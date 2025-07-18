import React from 'react';
const Profile_SuperPower=({power})=>{
    return(
        <div className="cq-card">
        <h3>{power}</h3>
        {/* <p>Master-level control over temporal flow and chronological events</p> */}
        <div className="cq-bar" style={{ width: "95%" }}></div>
      </div>
    )
}
export default Profile_SuperPower;