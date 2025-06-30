import Login_Button from '../Components/Login_Button'
import Navbar from '../Components/Navbar';
const Home=()=>{
    return (
        
        <div>
            <Navbar />
            <h1>BattleWorld Awaits!</h1>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Login_Button text="Login as Marvel Hero" />
                <Login_Button text="Login as Doom" />
            </div>
        </div>
    )
} 
export default Home; 