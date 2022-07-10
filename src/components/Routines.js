import React, { useEffect, useState } from "react";
import { fetchAllPublicRoutines, createRoutine, deleteRoutine, addActivityToRoutine, fetchAllActivities, editRoutine, editActivity } from "../api";

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

    function buttonToggle() {
        var t = document.getElementByClassName("editActivityBtn");
        t.classList.toggle("hidden");
        var f = document.getElementById("editActivity");
        f.classList.toggle("hidden");
    }
    
    return (
        <>
        
         {/* //ADD ROUTINE */}
            <div>
            <br></br>
                {   loggedIn ?
                
                    <fieldset className='routine-box'>
            
                        <div className="formAddRoutine"><center>
                            <br></br>
                            <div>Add A Monkey Pox Routine</div>
                            <br></br>
                            <form onSubmit={ async (event) => {
                                event.preventDefault();
                                const result = await createRoutine(token, routineName, routineGoal, isPublic);
                                if(!result.error) {
                                    getAllPublicRoutinesAndActivites();

                                } else {
                                    alert(result.error);
                                }
                            }}>

                                <input type="text" placeholder="Routine Name" onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                <br></br>
                                <input type="text" placeholder="Routine Goal" onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                <br></br>
                                <label>Public Routine? </label>
                                <input type="checkbox" value={isPublic} checked={isPublic} onChange={()=>{ setIsPublic(!isPublic); console.log(!isPublic) }}></input>
                                <br></br>
                                <button type="submit" className="btnAddRoutine">Add Routine</button>
                                
                            </form>
                        </center></div>
                    </fieldset> : null
                }
            </div>
            <h1> Routines </h1>
            
            <div id='allRoutines'>
                {   routines ? routines.map(routine => {
                                return (
                                    <div className="routine" key={routine.id}>
                                        
                                        <h3>{routine.name}</h3>
                                        <p><span className='label'>Goal: </span>{routine.goal}</p>
                                        <p><span className='label'>Creator: </span>{routine.creatorName}</p>
                                        
                                        { routine.creatorId===userId ? 
                                            <form onSubmit={ async (event) => {
                                                event.preventDefault();
                                                const result = await editRoutine(token, routine.id, routineName, routineGoal);
                                                if(!result.error){
                                                    getAllPublicRoutinesAndActivites()

                                                }else{
                                                    alert(result.error);
                                                }
                                            }}>
                                                    <input type="text" placeholder="Name" value={routineName} onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                                    <br></br>
                                                    <input type="text" placeholder="Goal" value={routineGoal} onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                            </form>:null
                                        }<br></br>
                                        {
                                        routine.creatorId === userId ? <center><button className="routineBtn">Edit Routine</button></center> : null 
                                        }<br></br>
                                        {
                                        routine.creatorId === userId ? <center><button className="routineBtn" onClick={() => { deleteRoutine(token, routine.id) }}>Delete</button></center> : null
                                        }<br></br>
                                        {
                                            routine.creatorId===userId ? 
                                                <form onSubmit={async (event) => {
                                                        event.preventDefault();
                                                        let result = addActivityToRoutine(token, routine.id, activityId, count, duration);
                                                        if(!result.error){
                                                            getAllPublicRoutinesAndActivites();
                        
                                                        } else {
                                                            alert(result.error);
                                                        }
                                                    }}>
                                                    <center><select 
                                                        className="addActivity"
                                                        value={activityId}
                                                        onChange={(event) => setActivityId(event.target.value)}>
                                                        {activities.map(selectedOption => {return <option key={selectedOption.id} value={selectedOption.id}>{selectedOption.name}</option>})}
                                                    </select></center><br></br>
                                                    
                                                    <input type="text" placeholder="Count" onChange={(event) => { setCount(event.target.value) }}></input>
                                                    <br></br>
                                                    <input type="text" placeholder="Duration" onChange={(event) => { setDuration(event.target.value) }}></input>
                                                    <br></br>
                                                    <center><button type="submit" className="addActivityBtn">Add Activity</button></center>
                                                    <br></br>
                                                </form> : null
                                        }
                                        {/* <p><center><span className='label'>--Activities--</span></center></p> */}
                                        
                                        {
                                         routine.activities ? routine.activities.map(activity => 
                                            
                                            <div className="routineActivity" key={activity.id}>
                                                <fieldset className='routines'>
                                                <legend>{activity.name}</legend>
                                                <p><span className='label'>Description: </span>{activity.description}</p>
                                                <p><span className='label'>Count: </span>{activity.count}</p>
                                                <p><span className='label'>Duration: </span>{activity.duration}</p>
                                                </fieldset>
                                                <br></br><center>{ routine.creatorId===userId ? <button className="editActivityBtn" onClick = { () => {buttonToggle()}}>Edit Activity</button>: null}</center><br></br>
                                                
                                                { routine.creatorId===userId ? 
                                                    <form id = "editActivity" onSubmit={ async (event) => {
                                                        event.preventDefault();
                                                        const result = await editActivity(token, activity.routineActivityId, count, duration);
                                                        if(!result.error){
                                                            getAllPublicRoutinesAndActivites()
                                                        }else{
                                                            alert(result.error);
                                                        }
                                                        }}>
                                                        <input type="text" placeholder="Count" value={count} onChange={(event) => { setCount(event.target.value) }}></input>
                                                        <br></br>
                                                        <input type="text" placeholder="Duration" value={duration} onChange={(event) => { setDuration(event.target.value) }}></input>
                                                        <br></br><center><button type="submit" className="submitActivityBtn">Submit Edit</button></center><br></br>
                                                    </form> : null
                                                }
                                            </div>
                                          ) : null
                                         }
                                         <br></br>
                                    </div>
                                    
                    )
                }) : null
                }   
            </div>
        </>
    )
}