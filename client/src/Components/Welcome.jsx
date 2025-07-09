import React from 'react';
import '../Components_CSS/Welcome.css';
const Welcome=({name,jobs,applications,interviews})=>{
    return(
        <div className="wel">
            <div>
            <h1>Welcome Back, {name}!</h1>  
            <p>The multiverse awaits your next battle</p>
            </div>
            <div className="jbs">
            <h1>{jobs}</h1>
            <p> Open Jobs</p>
            </div>
            <div className="apps">
                <h1>{applications}</h1>
            <p>Applications</p>
            </div>
            <div className="ints">
                <h1>{interviews}</h1>
            <p>Interviews</p>
            </div>
        </div>
    );
};
export default Welcome;