import React from "react";
import { Link } from "react-router-dom";
import lifter from "../images/liftbro.png";
import liftgirl from "../images/liftgirl.png";

export default function Home() {
    
    return (
        <div className="home-col">
            <h1 className="colors">Welcome to Fitness Tracker!</h1>
            <p className="centered"> Team Monkey Pox is here to help you get in shape!</p>
            <div className="home-row">
                {/* Links to the activities page */}
                <Link to='/Activities' className="cards">
                <p>Think you're up to the challange? Check out some of the activities that you can add!</p>
                </Link>
                <img className="images" src={lifter} alt="Lifter"></img>
            </div>
            <div className='home-row'>
                <img className="images" src={liftgirl} alt="Liftgirl" />
                {/* Links to the routines page */}
                <Link to='/Routines' className='cards'> 
                <p>Come check out some routines and see what works for you!</p>
                </Link> 
            </div>
        </div>
    )
}