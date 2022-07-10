import React, { useEffect, useState } from 'react';
import { fetchAllActivities, createActivity } from '../api';

export default function Activities({loggedIn, token, activities, setActivities}){

    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    
    async function getAllActivities() {
        try {
            const result = await fetchAllActivities();
            result.reverse();
            setActivities(result);
        }
        catch (err) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllActivities();
        
    }, [])


    return (
        <>
        <div>
        <br></br>
            {   loggedIn ? 
                <fieldset className='create-activity'>
                <legend>Create A New Activity</legend><center>
                <form onSubmit={async (event) => {
                    event.preventDefault();
                    const result = await createActivity(token, activityName, activityDescription);
                    if(!result.error) {
                        getAllActivities();
                    } else {
                        alert(result.error);
                    }
                }}>
                    
                    <div>Create your own Monkey Pox Activity!</div>
                    <br></br>
                    <input type="text" placeholder="Activity Name" required onChange={(event) => { setActivityName(event.target.value) }} ></input>
                    <br></br>
                    <input type="text" placeholder="Description" onChange={(event) => { setActivityDescription(event.target.value) }} ></input>
                    <br></br>
                    <button className='create-button' type="submit">CREATE </button>
                    <br></br>
                </form>
                </center></fieldset> : null }
            </div>
            <h1> Activities</h1>
            {
            
                activities.map(activity => {
                    return(
                        <div className='activity-row' key={activity.id}>
                            <fieldset className='activities'>
                                
                                <legend><b>{activity.name}</b></legend>
                                
                                <div>Activity ID #{activity.id}</div>
                                    
                                <div><i>{activity.description}</i></div>
                                
                            </fieldset>
                            <br></br>
                            
                        </div>
                    )
                })
            }


        </>

    )

}
