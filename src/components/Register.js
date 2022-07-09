import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";


export default function Register({ username, setUsername, setToken, setLoggedIn, setUserId }) {
  
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  return (

    <>
      <br></br>
      <br></br>
        <fieldset>
          
          <legend>Sign Up!</legend>
          <div className="formLogIn"><center>
            <div>Register for Monkey Pox</div>
            <br></br>
            <form onSubmit={async (event) => {
              event.preventDefault()
              if (password.length < 8) {
                alert("password must contain atleast 8 characters")
              } else {
                let result = await registerUser(username, password);
                if (!result.error) {
                  setToken(result.token)
                  setLoggedIn(true)
                  setUserId(result.user.id)
                  localStorage.setItem("userId", result.user.id)
                  localStorage.setItem("token", result.token)
                  alert("Sucessfully Registered with Monkey Pox...Redirecting to your Home Page")
                  navigate("/Home")
                }
                else {
                  alert("Username Already Exists!")
                }
              }
            }}>
              {/* <label>Desired Username</label> */}
              <input type="text" placeholder="Desired Username" required value={username} onChange={(event) => { setUsername(event.target.value) }}></input>
              <br></br>
              {/* <label>Desired Password</label> */}
              <input type="password" placeholder="Desired Password" required value={password} onChange={(event) => { setPassword(event.target.value) }}></input>
              <br></br>
              <button type="submit">REGISTER</button>
            </form>
            <br></br>
            <div>Already have Monkey Pox Credentials?</div>
            <br></br>
            <Link to="/Login">Log In Here</Link>
          </center></div>
        </fieldset>
    </>

  )
}