import React, { useEffect, useState } from 'react';
import reactdomclient  from "react-dom/client";
import { BrowserRouter, useNavigate, Routes, Route, Link } from "react-router-dom";

export default function Activities({loggedIn, token, activities, setActivities}){


    useEffect(()=>{

        async function getActivities(){
            try{
                const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                  let data = await response.json()
                  
                  
                  setActivities(data)
            }
        catch(err){
            console.log(error)
        }
    }
    getActivities()
    },[])

    return (
        <>
        <h1> Activities</h1>
        {
            activities.map(activity => {
                return <li key = {activity.id}>
                    <div>{activity.id}</div>
                    <div>{activity.name}</div>
                    <div>{activity.description}</div>
                    </li>
            })
        }
        </>
    )
}

//MIGHT BE ABLE TO USE SOME FROM THIS LATER 

// export default function Activities({ loggedIn, token }) {

//     const [activities, setActivities ] = useState([]);
//     const [activityName, setActivityName] = useState('');
//     const [activityDescription, setActivityDescription] = useState('')

//     useEffect(() => {

//         async function getActivities() {
//             try {
//                 const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `${token}`
//                       },
//                 })

//                 let data = await response.json()
//                 console.log(data)

//                 // setActivities(data.data.id)

//             } catch (err) {
//                 console.log(err)

//             }
//         }
//         getActivities()
//     }, [token])
//     async function createActivity(activityid, token) {
//         try {
//             const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/`, {
         
//             method: "POST",
//             body: JSON.stringify({
//                 activity: {
//               name: activityName,
//               description: activityDescription
//                 }
//             })
//           })
//             let data = await response.json()
//             setActivityName(data.activity.name)
//             setActivityDescription(data.acitivity.description)
//             console.log(data)
//         } catch (err) {
//             console.log(err)
//         }
//     }
//     {
//         return (
//             <>
//                 {   loggedIn ?
//                     activities.map((activity) => {
//                         return (
//                             <div key={activity.id}>
//                                 <div className="card">
//                                     <div><h4>Name{activity.name}</h4></div>
//                                     <div>Description:{activity.description}</div>

//                                     <label></label>
//                                     <input type="text" placeholder="Create Activity" onChange={(event) => { createActivity(event.target.value) }} ></input>
//                                     <br />
//                                     <button type="submit" className="btCreate"
//                                         onClick={() => createActivity(activity.id)}>Create Activity</button>
//                                 </div>
//                                 <br />
//                             </div>
//                         )
//                     }) : null
//                 }
//             </>
//         )
//     }
// }