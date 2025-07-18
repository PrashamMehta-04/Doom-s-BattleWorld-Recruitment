import React from 'react';
import '../Components_CSS/making_Profile.css';
import exclamation from '../Components_CSS/exclamation.png';
import {useNavigate} from 'react-router-dom';
const Making_Profile=()=>{
    const navigate=useNavigate();
    return(
        <div className="Profile">
            <div>
                <img src={exclamation}></img>
            </div>
            <div className="text">
           <h1>Haven't built your profile yet?</h1>
           <p> Complete it now to get matched with best roles!</p> 
           </div>
           <div>
            <button onClick={()=>navigate('/Resume')} className="Complete">Complete Now</button>
           </div>
        </div>
    );
};
export default Making_Profile;