import React, {useState , useEffect} from "react";
import reactdomclient  from "react-dom/client";
import { BrowserRouter, useNavigate, Routes, Route, Link } from "react-router-dom";

export default function MyRouintes({token, setPosts}){

    // const navigate = useNavigate()

    // async function createMyRoutines(){
    //     try{
    //         const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines/{$id}', {
    //         method: "POST",
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${token}`
    //         },
    //         body: JSON.stringify({
    //           post: {
    //             title: title,
    //             description: description,
    //             price: Price,
    //             willDeliver: willDeliver
    //           }
    //         })
    //       })
    //       let data = await response.json()
    //             setPosts(data.data.post)

    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
        return (
            <>
            <div id="postForm">
            <form onSubmit={(event)=>{
            event.preventDefault()
            createPost()
            navigate("/Posts")
        }}>
                <label>POST</label>
                <br></br>
               
                <input type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}} placeholder="name of the sale item"></input>
                <br></br>
                
                <input type="text" value={description} onChange={(event)=>{setDescription(event.target.value)}} placeholder="decription of the item"></input>
                <br></br>
                
                <input type="text" placeholder = "price of the item" value={Price} onChange={(event)=>{setPrice(event.target.value)}}></input>
                <br></br>
                
                <input type="text" placeholder = "Location" value={Location} onChange={(event)=>{setLocation(event.target.value)}}></input>
                <br></br>
                <label type="checkbox" value={willDeliver} >Delivery</label>
                <input type="checkbox" onChange={(event)=>{setWillDeliver(true)}}></input>
                <br></br>
                <button type="submit">submit</button>
            </form>
            </div>
            </>
            )
}   //search results from art collector: reference  

//need to create a useState for each attribute(title, description, Price, Location and willDeliver. 
// pass in a variable also )
