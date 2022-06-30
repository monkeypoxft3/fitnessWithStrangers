import react, {useState , useEffect} from "react";
import {  useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";


export default function Register({setToken, setLoggedIn}){
    const[username, registerUsername] = useState("")
    const[password, registerPassword] = useState("")
    const navigate = useNavigate()

    async function registerUser(){
        try{
            const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user: {
                    username: username,
                    password: password
                  }
                })
              })
              let result = await response.json()
              if (result.data) {
                setToken(result.data.token)
                setLoggedIn(true) 
                localStorage.setItem("token", result.data.token)
                navigate("/Posts")
              }
              else{
              alert("Username Already Exists!")
              }
              

        }catch(err){
            console.log("Could not register " + err)
        }
    }
   

return( 
        
    <>
    
    <form onSubmit={(event)=>{
            event.preventDefault()
            if (password.length<8){
              alert("password must contain atleast 8 characters")
            }
            else{
            registerUser()
            }
        }}>
       <label>Desired Username</label> 
       <input type="text" value={username} onChange={(event)=> {registerUsername(event.target.value)}}></input>
       <label>Set Password</label>
       <input type="text" value ={password} onChange={(event)=>{registerPassword(event.target.value)}}></input>
       <button type = "submit">SET</button>
   
    </form>
    <Link to="/Login">Log In</Link>
    </>

)
}