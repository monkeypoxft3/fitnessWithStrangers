import React, {useState , useEffect} from "react";
import { fetchUserRoutines, createRoutine, deleteRoutine, addActivityToRoutine, fetchAllActivities, editRoutine, editActivity }  from "../api";

export default function MyRouintes({token, username, routines, setRoutines, activities, setActivities}){

    const [activityId, setActivityId] = useState(0);
    const [routineName, setRoutineName] = useState('');
    const [routineGoal, setRoutineGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        
        async function getAllUserRoutinesAndActivites() {
            try {
                const routinesResult = await fetchUserRoutines(token, username);
                const activitiesResult = await fetchAllActivities();
                if(!routinesResult.error) {
                    routinesResult.reverse();
                    setRoutines(routinesResult);
                    setActivities(activitiesResult);
                } else {
                    console.error(routinesResult.error);
                }
            } catch (err) {
                console.error("Error fetching routines!"+err);
            }
        }
        getAllUserRoutinesAndActivites()

    }, [token])    

    function activityToggle(id) {
        var toggle = document.getElementById(`editActivity${id}`);
        if (toggle.style.display === "none") {
            toggle.style.display = "block";
        } else {
            toggle.style.display = "none"
        }
    }
    function routineToggle(id) {
        var toggle = document.getElementById(`editRoutine${id}`);
        if (toggle.style.display === "none") {
            toggle.style.display = "block";
        } else {
            toggle.style.display = "none"
        }
    }
    function addActivityToggle(id) {
        var toggle = document.getElementById(`addActivity${id}`);
        if (toggle.style.display === "none") {
            toggle.style.display = "block";
        } else {
            toggle.style.display = "none"
        }
    }
    return (
        <>
            <div>
                <br></br>
                <fieldset className='routine-box'>
                    <legend>Create A New Routine</legend>
                    <div className="formAddRoutine"><center>
                        <div>Add A Monkey Pox Routine</div>
                        <br></br>
                        {/* Create Routine */}
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
                            <input type="checkbox" onChange={()=>{ setIsPublic(!isPublic) }}></input>
                            <br></br>
                            <button type="submit" className="btnAddRoutine">Add Routine</button>
                        </form>
                    </center></div>
                </fieldset>
            </div>
            <h1>My Routines</h1>
            <div id='allRoutines'>
                {   routines ? routines.map(routine => {
                                return (
                                    <div className="routine" key={routine.id}>
                                        <h3>{routine.name}</h3>
                                        <p><span>Goal: </span>{routine.goal}</p>
                                        <p><span>Creator: </span>{routine.creatorName}</p>
                                        <p><span>This routine is </span>{routine.isPublic ? "Public" : "Private"}</p>
                                        {/* Edit Routine */}
                                        <form id={`editRoutine${routine.id}`} className="editRoutineForm" onSubmit={ async (event) => {
                                            event.preventDefault();
                                            const result = await editRoutine(token, routine.id, routineName, routineGoal, isPublic);
                                            if(!result.error){
                                                getAllUserRoutinesAndActivites(username);

                                            }else{
                                                alert(result.error);
                                            }
                                            }}>
                                                <input type="text" placeholder="name" onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                                <br></br>
                                                <input type="text" placeholder="goal" onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                                <label>Public Routine? </label>
                                                <input type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)}></input>
                                                <button type="submit" className="editRoutine">Submit Changes</button>
                                        </form>
                                        <button className="routineBtn" onClick={() => { routineToggle(routine.id) }} >Edit Routine</button> 
                                        <button className="routineBtn" onClick={() => { deleteRoutine(token, routine.id) }}>Delete Routine</button>
                                        {/* Add Activity To Routine */}
                                        <form id={`addActivity${routine.id}`} className="addActivityForm" onSubmit={(event) => {
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
                                            <button type="submit" className="addActivityBtn">Submit Activity</button>
                                        </form>
                                        <button className="addActivityBtn" onClick={() => { addActivityToggle(routine.id) }} >Add Activity</button>
                                        {/* Edit Activity */}
                                        { routine.activities ? routine.activities.map(activity => 
                                            <div className="routineActivity" key={activity.id}>
                                                <h3>{activity.name}</h3>
                                                <p><span className='label'>Description: </span>{activity.description}</p>
                                                <p><span className='label'>Duration: </span>{activity.duration}</p>
                                                <p><span className='label'>Count: </span>{activity.count}</p>
                                                <form id = {`editActivity${routine.id}`} className="editActivityForm" onSubmit={ async (event) => {
                                                        event.preventDefault();
                                                        const result = await editActivity(token, activity.routineActivityId, count, duration);
                                                        if(!result.error){
                                                            getAllUserRoutinesAndActivites(username);
                                                        }else{
                                                            alert(result.error);
                                                        }
                                                        }}>
                                                        <input type="text" placeholder="count" onChange={(event) => { setCount(event.target.value) }}></input>
                                                        <br></br>
                                                        <input type="text" placeholder="duration" onChange={(event) => { setDuration(event.target.value) }}></input>
                                                        <br></br>
                                                        <button type="submit" className="submitActivityBtn">Submit Edit</button>
                                                </form>
                                                <button className="editActivityBtn" onClick={() => { activityToggle(activity.id) }}>Edit Activity</button>
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
