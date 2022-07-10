import React, {useState , useEffect} from "react";
import { fetchUserRoutines, createRoutine, deleteRoutine, addActivityToRoutine, fetchAllActivities }  from "../api";
import { BrowserRouter, useNavigate, Routes, Route, Link } from "react-router-dom";

export default function MyRouintes({token, userId, username, routines, setRoutines, activities, setActivities}){

    const [activityId, setActivityId] = useState(0);
    const [routineName, setRoutineName] = useState('');
    const [routineGoal, setRoutineGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    async function getAllUserRoutinesAndActivites(username) {
        try {
            const routinesResult = await fetchUserRoutines(token, username);
            const activitiesResult = await fetchAllActivities();
            routinesResult.reverse();
            setRoutines(routinesResult);
            setActivities(activitiesResult);
        } catch (err) {
            console.error("Error fetching routines!");
        }
    }

    useEffect(() => {
        
        getAllUserRoutinesAndActivites(username);

    }, [])

        return (
            <>
            <div>
                <br></br>
                    <fieldset className="routine-box">
                        
                        <div className="formAddRoutine"><center>
                            <br></br>
                            <div>Add A Monkey Pox Routine</div>
                            <br></br>
                            <form onSubmit={async (event) => {
                                event.preventDefault();
                                const result = await createRoutine(token, routineName, routineGoal, isPublic);
                                if(!result.error){
                                    getAllUserRoutinesAndActivites(username);

                                } else {
                                    alert(result.error);
                                }
                            }}>

                                <input type="text" placeholder="Routine Name" onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                <br></br>
                                <input type="text" placeholder="Routine Goal" onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                <br></br>
                                <label>Public Routine? </label>
                                <input type="checkbox" value={isPublic} onChange={(event)=>{ setIsPublic(event.target.value) }}></input>
                                <br></br>
                                <button type="submit" className="btnAddRoutine">Add Routine</button>
                                
                            </form>
                        </center></div>
                    </fieldset>
            </div>
            <h1></h1>
            <div id='allRoutines'>
                {   routines ? routines.map(routine => {
                                return (
                                    <div className="routine" key={routine.id}>
    
                                        <h3>{routine.name}</h3>
                                        <p><span>Goal: </span>{routine.goal}</p>
                                        <p><span>Creator: </span>{routine.creatorName}</p>
                                        <p><span>Public? </span>{routine.isPublic}</p>
                                        <form onSubmit={ async (event) => {
                                                event.preventDefault();
                                                const result = await editRoutine(token, routine.id, routineName, routineGoal);
                                                if(!result.error){
                                                    getAllUserRoutinesAndActivites(username);

                                                }else{
                                                    alert(result.error);
                                                }
                                            }}>
                                                    <input type="text" placeholder="Name" value={routineName} onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                                    <br></br>
                                                    <input type="text" placeholder="Goal" value={routineGoal} onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                            </form>
                                        <br></br>
                                        <center><button className="routineBtn">Edit Routine</button>
                                        
                                        
                                        <button className="routineBtn" onClick={() => { deleteRoutine(token, routine.id) }}>Delete Routine</button></center> : null
                                        
                                        {
                                            routine.creatorId===userId ? 
                                                <form onSubmit={(event) => {
                                                        event.preventDefault();
                                                        addActivityToRoutine(token, routine.id, count, duration);
                                                    }}>
                                                    <center><select 
                                                        className="addActivity"
                                                        value={activityId}
                                                        onChange={(event) => setActivityId(event.target.value)}>
                                                        { activities.map(selectedOption => {return <option key={selectedOption.id} value={selectedOption.id}>{selectedOption.name}</option>})}
                                                        
                                                    </select></center><br></br>
                                                    <input type="text" placeholder="Count" onChange={(event) => { setCount(event.target.value) }}></input>
                                                    <br></br>
                                                    <center><input type="text" placeholder="Duration" onChange={(event) => { setDuration(event.target.value) }}></input>
                                                    <br></br>
                                                    <button type="submit" className="addActivityBtn">Add Activity</button></center>
                                                    <br></br>
                                                </form> : null
                                        }
                                        {/* <p><center><span className='label'>--Activities--</span></center></p> */}
                                        
                                        {
                                         routine.activities ? routine.activities.map(activity => 
                                            <div className="routineActivity" key={activity.id}>
                                                <h3>{activity.name}</h3>
                                                <p><span className='label'>Description: </span>{activity.description}</p>
                                                <p><span className='label'>Duration: </span>{activity.duration}</p>
                                                <p><span className='label'>Count: </span>{activity.count}</p>
                                                <form id = "editActivity" onSubmit={ async (event) => {
                                                        event.preventDefault();
                                                        const result = await editActivity(token, activity.routineActivityId, count, duration);
                                                        if(!result.error){
                                                            getAllUserRoutinesAndActivites(username);
                                                        }else{
                                                            alert(result.error);
                                                        }
                                                        }}>
                                                        <center><input type="text" placeholder="Count" value={count} onChange={(event) => { setCount(event.target.value) }}></input>
                                                        <br></br>
                                                        <input type="text" placeholder="Duration" value={duration} onChange={(event) => { setDuration(event.target.value) }}></input>
                                                        <br></br>
                                                        <button type="submit" className="submitActivityBtn">Submit Edit</button></center>
                                                        <br></br>
                                                </form>
                                            </div>
                                          ) : null
                                        }
                          
                            
                        </div>
                    )
                }) : null
                }
                <br></br>
            </div>
            </>
            )
}
