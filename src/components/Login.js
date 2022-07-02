import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login({ setToken, setLoggedIn }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {

    }
  }, []);

  async function LoginUser() {
    try {
      //console.log("user",username)
      //console.log("password" ,password)
      const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
      })
      let result = await response.json()
      //console.log(result)
      console.log(result)
      setToken(result.token)
      setLoggedIn(true)
      localStorage.setItem("token", result.token)
      navigate("/Home")
    } catch (err) {
      console.log("Ahh couldn't log in!! " + err)
    }
  }
  return (

    <>
      
      <form onSubmit={(event) => {
        event.preventDefault()
        LoginUser()
      }}>
        <label>Enter Username:</label>
        <input type="text" value={username} onChange={(event) => { setUsername(event.target.value) }}></input>
        <label>Enter Password:</label>
        <input type="text" value={password} onChange={(event) => { setPassword(event.target.value) }}></input>
        <button type="submit">Submit</button>
      </form>
      <Link to="/Register">Create Account</Link>
      
    </>

  )
}