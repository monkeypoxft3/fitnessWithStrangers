import React, { useEffect, useState } from "react";
import { fetchAllPublicRoutines, createRoutine, deleteRoutine, addActivityToRoutine, fetchAllActivities, editRoutine } from "../api";

export default function Routines({ token, loggedIn, userId, routines, setRoutines, activities, setActivities }) {
    const [activityId, setActivityId] = useState(0);
    const [routineName, setRoutineName] = useState('');
    const [routineGoal, setRoutineGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    async function getAllPublicRoutinesAndActivites() {
        try {
            const routinesResult = await fetchAllPublicRoutines();
            const activitiesResult = await fetchAllActivities();
            routinesResult.reverse();
            setRoutines(routinesResult);
            setActivities(activitiesResult);
        } catch (err) {
            console.error("Error fetching routines!");
        }
    }

    useEffect(() => {
        
        getAllPublicRoutinesAndActivites();

    }, [])
 
    return (
        <>
         {/* //ADD ROUTINE */}
         <div>
                {   loggedIn ?
                    <fieldset>
                        <legend>Add Routine</legend>
                        <div className="formAddRoutine"><center>
                            <div>Add A Monkey Pox Routine</div>
                            <br></br>
                            <form onSubmit={async (event) => {
                                event.preventDefault();
                                const result = await createRoutine(token, routineName, routineGoal, isPublic);
                                if(!result.error){
                                    getAllPublicRoutinesAndActivites();

                                } else {
                                    alert(result.error);
                                }
                            }}>

                                <input type="text" placeholder="Routine name" onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                <br></br>
                                <input type="text" placeholder="Routine goal" onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                <br></br>
                                <label>Public Routine? </label>
                                <input type="checkbox" value={isPublic} onChange={(event)=>{ setIsPublic(event.target.value) }}></input>
                                <br></br>
                                <button type="submit" className="btnAddRoutine">Add Routine</button>
                                
                            </form>
                        </center></div>
                    </fieldset> : null
                }
            </div>
            
            <div id='allRoutines'>
                {   routines ? routines.map(routine => {
                                return (
                                    <div className="routine" key={routine.id}>
    
                                        <h3>{routine.name}</h3>
                                        <p><span className='label'>Goal: </span>{routine.goal}</p>
                                        <p><span className='label'>Creator: </span>{routine.creatorName}</p>
                                        
                                        {routine.creatorId===userId ? 
                                            <form onSubmit={(event) => {
                                                event.preventDefault();
                                                //editRoutine(token, routineId, routineName, routineGoal);
                                            }}>
                                                    <input type="text" placeholder="name" value={routineName} onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                                    <br></br>
                                                    <input type="text" placeholder="goal" value={routineGoal} onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                            </form>:null
                                        }
                                        {
                                        routine.creatorId === userId ? <button className="routineBtn">Edit Routine</button> : null
                                        }
                                        {
                                        routine.creatorId === userId ? <button className="routineBtn" onClick={() => { deleteRoutine(token, routine.id) }}>Delete</button> : null
                                        }
                                        {
                                            routine.creatorId===userId ? 
                                                <form onSubmit={(event) => {
                                                        event.preventDefault();
                                                        addActivityToRoutine(token, routine.id, count, duration);
                                                    }}>
                                                    <select 
                                                        className="addActivity"
                                                        value={activityId}
                                                        onChange={(event) => setActivityId(event.target.value)}>
                                                        {activities.map(selectedOption => {return <option key={selectedOption.id} value={selectedOption.id}>{selectedOption.name}</option>})}
                                                    </select>
                                                    
                                                    <input type="text" placeholder="count" onChange={(event) => { setCount(event.target.value) }}></input>
                                                    <br></br>
                                                    <input type="text" placeholder="duration" onChange={(event) => { setDuration(event.target.value) }}></input>
                                                    <button type="submit" className="addActivityBtn">Add Activity</button>
                                                </form> : null
                                        }
                                        <p><span className='label'>--Activities--</span></p>
                                        
                                        {
                                         routine.activities ? routine.activities.map(activity => 
                                            <div className="routineActivity" key={activity.id}>
                                              <h3>{activity.name}</h3>
                                              <p><span className='label'>Description: </span>{activity.description}</p>
                                              <p><span className='label'>Duration: </span>{activity.duration}</p>
                                              <p><span className='label'>Count: </span>{activity.count}</p>
 
                                               {routine.creatorId===userId ? 
                                                <form onSubmit={(event) => {
                                                    event.preventDefault();
                                                    //editActivity(token, routineId, count, duration);
                                                }}>
                                                    <input type="text" placeholder="count" value={count} onChange={(event) => { setCount(event.target.value) }}></input>
                                                    <br></br>
                                                    <input type="text" placeholder="duration" value={duration} onChange={(event) => { setDuration(event.target.value) }}></input>
                                                    <button type="submit" className="submitActivityBtn">Submit Edit</button>
                                            </form>:null
                                        }
                                        <button type="submit" className="editActivityBtn">Edit Activity</button>
                                            </div>
                                          ) : null
                                        }
                          
                            
                        </div>
                    )
                }) : null
                }
            </div>
        </>
    )
}