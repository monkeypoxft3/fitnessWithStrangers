import React, {useState , useEffect} from "react";
import { fetchUserRoutines, createRoutine, deleteRoutine, addActivityToRoutine, fetchAllActivities, editRoutine, editActivity }  from "../api";
import { BrowserRouter, useNavigate, Routes, Route, Link } from "react-router-dom";

export default function MyRouintes({token, userId, username, routines, setRoutines, activities, setActivities}){

    const [activityId, setActivityId] = useState(0);
    const [routineName, setRoutineName] = useState('');
    const [routineGoal, setRoutineGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {

        getAllUserRoutinesAndActivites(username);

    }, [])

    async function getAllUserRoutinesAndActivites(username) {
        try {
            const routinesResult = await fetchUserRoutines(token, username);
            const activitiesResult = await fetchAllActivities();
            if(!routinesResult.error) {
                routinesResult.reverse();
                setRoutines(routinesResult);
                setActivities(activitiesResult);
            } else {
                alert(routinesResult.error);
            }
        } catch (err) {
            console.error("Error fetching routines!"+err);
        }
    }

    

        return (
            <>
            <div>
                    <fieldset>
                        <legend>Add Routine</legend>
                        <div className="formAddRoutine"><center>
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

                                <input type="text" placeholder="Routine name" onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                <br></br>
                                <input type="text" placeholder="Routine goal" onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                <br></br>
                                <label>Public Routine? </label>
                                <input type="checkbox" value={isPublic} checked={isPublic} onChange={()=>{ setIsPublic(!isPublic) }}></input>
                                <br></br>
                                <button type="submit" className="btnAddRoutine">Add Routine</button>
                                
                            </form>
                        </center></div>
                    </fieldset>
            </div>
            
            <div id='allRoutines'>
                {   routines ? routines.map(routine => {
                                return (
                                    <div className="routine" key={routine.id}>
    
                                        <h3>{routine.name}</h3>
                                        <p><span>Goal: </span>{routine.goal}</p>
                                        <p><span>Creator: </span>{routine.creatorName}</p>
                                        <p><span>This routine is </span>{routine.isPublic ? "Public" : "Private"}{console.log(routine.isPublic)}</p>
                                        <form onSubmit={ async (event) => {
                                                event.preventDefault();
                                                const result = await editRoutine(token, routine.id, routineName, routineGoal);
                                                if(!result.error){
                                                    getAllUserRoutinesAndActivites(username);

                                                }else{
                                                    alert(result.error);
                                                }
                                            }}>
                                                    <input type="text" placeholder="name" value={routineName} onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                                    <br></br>
                                                    <input type="text" placeholder="goal" value={routineGoal} onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                                    <label>Public Routine? </label>
                                                    <input type="checkbox" value={isPublic} checked={isPublic} onChange={()=>{ setIsPublic(!isPublic) }}></input>
                                                    <button type="submit" className="editRoutine">Submit Changes</button>
                                            </form>
                                        
                                        <button className="routineEditBtn">Edit Routine</button>
                                        
                                        
                                        <button className="routineBtn" onClick={() => { deleteRoutine(token, routine.id) }}>Delete Routine</button>
                                        
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
                                                        { activities.map(selectedOption => {return <option key={selectedOption.id} value={selectedOption.id}>{selectedOption.name}</option>})}
                                                        
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
                                                <form id = "editActivity" onSubmit={ async (event) => {
                                                        event.preventDefault();
                                                        const result = await editActivity(token, activity.routineActivityId, count, duration);
                                                        if(!result.error){
                                                            getAllUserRoutinesAndActivites(username);
                                                        }else{
                                                            alert(result.error);
                                                        }
                                                        }}>
                                                        <input type="text" placeholder="count" value={count} onChange={(event) => { setCount(event.target.value) }}></input>
                                                        <br></br>
                                                        <input type="text" placeholder="duration" value={duration} onChange={(event) => { setDuration(event.target.value) }}></input>
                                                        <button type="submit" className="submitActivityBtn">Submit Edit</button>
                                                </form>
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
