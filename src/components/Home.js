
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import lifter from "../images/liftbro.png";
import liftgirl from "../images/liftgirl.png";



export default function ({ token }) {

    const [userID, setUserID] = useState("")
    useEffect(() => {
        async function userData() {
            try {
                const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                let data = await response.json()
                setUserID(data.user.id)
            } catch (err) {
                console.error(err)

            }
        }
        userData()
    }, [token])
    async function sendMsg(postid){
        try{
            let response = await fetch(`https://strangers-things.herokuapp.com/api/2202-vpi-rm-web-pt/posts/${postid}/messages`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  message: {
                    content: message
                  }
                })
              })
              let data = await results.json()
              
        }catch(err){

        }
        
    }
    return (
        <div className="home-col">
        {/* needs to be linked to username if not signed in then no name is shown*/}
            <h1>Welcome to Fitness Tracker</h1>
            <p className="centered"> Team Monkey Pox is here to help you get in shape!</p>
            <div className="home-row">
                {/* Links to the activities page */}
                <Link to='/Activities' className="cards">
                <h3 className="arrows">{'<'}</h3>
                <p>Think you're up to the challange? Check out some of the activities that you can add!</p>
                </Link>
                <img className="images" src={lifter} alt="Lifter"></img>
            </div>
 
            <div className='home-row'>
                <img className="images" src={liftgirl} alt="Liftgirl" />
                {/* Links to the routines page */}
                <Link to='/Routines' className='cards'> 
                <p>Come check out some routines and see what works for you!</p>
                <h3 className='arrow'>{'>'}</h3>
                </Link> 
            </div>
        </div>
    );
}