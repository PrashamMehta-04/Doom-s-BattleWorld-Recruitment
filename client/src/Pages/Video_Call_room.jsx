import { Navigate } from "react-router-dom";
import VideoCall from "../Components/VideoCall";
import { getStoreValue } from 'pulsy';
import { useNavigate } from "react-router-dom";
const Video_Call_room=({type})=>{
    const navigate=useNavigate();
    const username=getStoreValue('auth')?.user?.username;
    const backHome=()=>{
        if(username=="Doom007"){
            navigate('/doom');
        }
        else{
            fetch('http://localhost:5000/api/video-call-off',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({username})
            })
            navigate('/home-logged');
        }
    }
    return(
        <div>
            <h2>Video Call Room</h2>
            <VideoCall roomName={"important"} type={type}/>
            <button onClick={backHome}>Back to Home</button>
        </div>
    );
}
export default Video_Call_room;