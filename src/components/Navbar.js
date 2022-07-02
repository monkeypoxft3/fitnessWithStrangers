import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function Navbar({loggedIn, Logout}){

    //MY ROUTINES, NOT LOGGED IN ROUTINES,  ACTIVITIES, HOME,
    return (
    <>
    <div className = "nav">
        {
        !loggedIn?<Link className="link" to="Login"> LOGIN </Link>: <button onClick={Logout}> Logout </button>
        }
        {
        !loggedIn || loggedIn?<Link className="link" to="Home"> HOME</Link>:null
        }
        {
        !loggedIn?<Link className="link" to="Register"> REGISTER</Link>:null
        }
        {
        loggedIn?<Link className="link" to="MyRoutines"> MY ROUTINES</Link>:null
        }
        {
        !loggedIn || loggedIn?<Link className="link" to="Routines"> ROUTINES</Link>:null
        }
        {
        !loggedIn || loggedIn?<Link className="link" to="Activities"> ACTIVITIES</Link>:null
        }
</div>
        </>
    )
}