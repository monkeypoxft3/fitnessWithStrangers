import { useEffect, useState } from "react";
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
                { loggedIn ?
                    <fieldset className='routine-box'>
                        <legend>Create A New Routine</legend>
                        <div className="formAddRoutine"><center>
                            <div>Add A Monkey Pox Routine</div>
                            <br></br>
                            {/* Create Routine */}
                            <form onSubmit={async (event) => {
                                event.preventDefault();
                                const result = await createRoutine(token, routineName, routineGoal, isPublic);
                                if (!result.error) {
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
                                <input type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)}></input>
                                <br></br>
                                <button type="submit" className="btnAddRoutine">Add Routine</button>
                            </form>
                        </center></div>
                    </fieldset> : null
                }
            </div>
            <h1> Routines </h1>
            <div id='allRoutines'>
                { routines ? routines.map(routine => {
                    return (
                        <div className="routine" key={routine.id}>


                            <h3>{routine.name}</h3>
                            <p><span className='label'>Goal: </span>{routine.goal}</p>
                            <p><span className='label'>Creator: </span>{routine.creatorName}</p>
                            {/* Edit Routine */}
                            {routine.creatorId === userId ?
                                <form id={`editRoutine${routine.id}`} className="editRoutineForm" onSubmit={async (event) => {
                                    event.preventDefault();
                                    const result = await editRoutine(token, routine.id, routineName, routineGoal, isPublic);
                                    if (!result.error) {
                                        getAllPublicRoutinesAndActivites()

                                    } else {
                                        alert(result.error);
                                    }
                                }}>
                                    <input type="text" placeholder="name" onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                    <br></br>
                                    <input type="text" placeholder="goal" onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                    <br></br>
                                    <center><label>Public Routine? </label>
                                    <input type="checkbox" checked={isPublic} onChange={() => { setIsPublic(!isPublic) }}></input>
                                    <button type="submit" className="editRoutine">Submit Changes</button></center>
                                </form> : null
                            }
                            { routine.creatorId === userId ? <button className="routineBtn" onClick={() => { deleteRoutine(token, routine.id); }}>Delete Routine</button> : null }
                            { routine.creatorId === userId ? <button className="routineBtn" onClick={() => { routineToggle(routine.id) }} >Edit Routine</button> : null }
                            {/* Add Activity To Routine */}
                            { routine.creatorId === userId ?
                                    <form id={`addActivity${routine.id}`} className="addActivityForm" onSubmit={async (event) => {
                                        event.preventDefault();
                                        let result = addActivityToRoutine(token, routine.id, activityId, count, duration);
                                        if (!result.error) {
                                            getAllPublicRoutinesAndActivites();
                                        } else {
                                            alert(result.error);
                                        }
                                        }}>
                                        <select
                                            className="addActivity"
                                            value={activityId}
                                            onChange={(event) => setActivityId(event.target.value)}>
                                            {activities.map(selectedOption => { return <option key={selectedOption.id} value={selectedOption.id}>{selectedOption.name}</option> })}
                                        </select>
                                        <input type="text" placeholder="count" onChange={(event) => { setCount(event.target.value) }}></input>
                                        <br></br>
                                        <input type="text" placeholder="duration" onChange={(event) => { setDuration(event.target.value) }}></input>
                                        <button type="submit" className="addActivityBtn">Submit Activity</button>
                                    </form> : null
                            }
                            { routine.creatorId === userId ? <button className="addActivityBtn" onClick={() => { addActivityToggle(routine.id) }} >Add Activity</button> : null }
                            { routine.activities ? routine.activities.map(activity =>
                                <div className="routineActivity" key={activity.id}>
                                    <fieldset className='routines'>
                                        <legend>{activity.name}</legend>
                                        <p><span>Description: </span>{activity.description}</p>
                                        <p><span>Count: </span>{activity.count}</p>
                                        <p><span>Duration: </span>{activity.duration}</p>
                                    </fieldset>
                                    {/* Edit Activity */}
                                    { routine.creatorId === userId ?
                                        <form id={`editActivity${routine.id}`} className="editActivityForm" onSubmit={async (event) => {
                                            event.preventDefault();
                                            const result = await editActivity(token, activity.routineActivityId, count, duration);
                                            if (!result.error) {
                                                getAllPublicRoutinesAndActivites()
                                            } else {
                                                alert(result.error);
                                            }
                                            }}>
                                            <input type="text" placeholder="count" onChange={(event) => { setCount(event.target.value) }}></input>
                                            <br></br>
                                            <input type="text" placeholder="duration" onChange={(event) => { setDuration(event.target.value) }}></input>
                                            <button type="submit" className="submitActivityBtn">Submit Edit</button>
                                        </form> : null }
                                        { routine.creatorId === userId ? <button className="editActivityBtn" onClick={() => { activityToggle(activity.id) }}>Edit Activity</button> : null }
                                </div>
                            ) : null }
                            <br></br>
                        </div>

                    )
                }) : null }
            </div>
        </>
    )
}