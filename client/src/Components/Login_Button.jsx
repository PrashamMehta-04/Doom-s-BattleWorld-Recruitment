import '../Components_CSS/Login_Buttonc.css'
const Login_Button = ({ text, onClick }) => {
    return (
        <div>
            <button className='but1' onClick={onClick}>{text}</button> 
        </div>
    )
}
export default Login_Button;