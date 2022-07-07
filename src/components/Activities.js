import React, { useEffect, useState } from 'react';
import reactdomclient from "react-dom/client";
import { BrowserRouter, useNavigate, Routes, Route, Link } from "react-router-dom";

export default function Activities({loggedIn, token, activities, setActivities}){

    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('')
    useEffect(() => {

        async function getActivities() {
            try {
                const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                let data = await response.json()


                setActivities(data)
            }
            catch (err) {
                console.log(error)
            }
        }
        getActivities()
    }, [])
    async function createActivity() {
        try {
            const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({
                    name: activityName,
                    description: activityDescription
                })
            })
            let data = await response.json()

        } catch (err) {
            console.error("Not created")
        }
    }

    return (
        <>
            {
                loggedIn ? <form onSubmit={(event) => {
                    event.preventDefault()
                    createActivity()
                }}>
                    <h3>Create an Activity</h3>
                    <input type="text" placeholder="Activity Name" onChange={(event) => { setActivityName(event.target.value) }} ></input>
                    <input type="text" placeholder="Description" onChange={(event) => { setActivityDescription(event.target.value) }} ></input>
                    <button type="submit"> CREATE</button>
                </form> : null
            }
            <h1> Activities</h1>
            {
                activities.map(activity => {
                    return <li key={activity.id}>
                        <div>{activity.id}</div>
                        <div>{activity.name}</div>
                        <div>{activity.description}</div>
                    </li>
                })
            }


        </>

    )

}
