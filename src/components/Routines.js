import React, { useEffect, useState } from "react";

export default function Routines({ token, loggedIn, userId, routines, setRoutines, activities }) {
    const [activityId, setActivityId] = useState(0);
    const [routineName, setRoutineName] = useState('');
    const [routineGoal, setRoutineGoal] = useState('');
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        async function getAllPublicRoutines() {
            try {
                const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines');
                let result = await response.json();
                console.log(result);
                setRoutines(result);
                return;
            } catch (error) {
                console.error("Error fetching all public routines!" + error);
            }
        }
        getAllPublicRoutines();
    }, [routines.length])

    //ADD ROUTINE 
    async function createRoutine() {
        try {
            const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({
                    name: routineName,
                    goal: routineGoal,
                    isPublic: true
                })
            })
            let data = await response.json()

        } catch (err) {
            console.error("Not created")
        }
    }

    async function deleteRoutine(id) {
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            let data = await response.json()

        } catch (err) {
            console.error("Cannot delete what you dont create")
        }
    }
    //ADD ACTIVITY TO ROUTINE
    async function addActivityToRoutine(routineId) {
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({
                    activityId: activityId,
                    count: count,
                    duration: duration
                })
            })
            let data = await response.json()

        } catch (err) {
            console.error("Not created")
        }
    }
    return (
        <>
         {/* //ADD ROUTINE */}
         <div>
                {loggedIn ?
                    <fieldset>
                        <legend>Add Routine</legend>
                        <div className="formAddRoutine"><center>
                            <div>Add A Monkey Pox Routine</div>
                            <br></br>
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                createRoutine()
                            }}>

                                <input type="text" placeholder="Routine name" onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                <br></br>
                                <input type="text" placeholder="Routine goal" onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
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
                                        <p><span className='label'>Activities: </span></p>
                                        
                                        {
                                         routine.activities ? routine.activities.map(activity => 
                                            <div className="routineActivity" key={activity.id}>
                                              <h3>{activity.name}</h3>
                                              <p><span className='label'>Description: </span>{activity.description}</p>
                                              <p><span className='label'>Duration: </span>{activity.duration}</p>
                                              <p><span className='label'>Count: </span>{activity.count}</p>
                                            </div>
                                          ) : null
                                        }
                                        
                                        {
                                            routine.creatorId===userId ? 
                                            <form>

                                                <select 
                                                    className="addActivity"
                                                    value={activityId}
                                                    onChange={(event) => setActivityId(event.target.value)}>
                                                    {activities.map(selectedOption => {return <option key={selectedOption.id} value={selectedOption.id}>{selectedOption.name}</option>})}
                                                    <button className="addActivityBtn" onClick={addActivityToRoutine(routine.id)}>Add</button>
                                                </select>
                                                <input type="text" placeholder="Count" onChange={(event) => { setCount(event.target.value) }}></input>
                                                <br></br>
                                                <input type="text" placeholder="Duration" onChange={(event) => { setDuration(event.target.value) }}></input>
                                            </form> : null
                                        }
                            {console.log(routine.creatorId,userId)}
                            {
                                routine.creatorId === userId ? <button className="routineBtn">Edit Routine</button> : null
                            }
                            {
                                routine.creatorId === userId ? <button className="routineBtn" onClick={() => { deleteRoutine(routine.id) }}>Delete</button> : null
                            }
                        </div>
                    )
                }) : null
                }
            </div>





            
        </>
    )
}