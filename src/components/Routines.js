import React, { useState, useEffect } from "react";

export default function Routines({ token, loggedIn, userId, routines, setRoutines, activities }) {
        const [ activityId, setActivityId ] = useState(0);
        // useEffect(() => {
        //     sortPostList(searchTerm, postList);
        // },[searchTerm])
    
        useEffect(() => {
            console.log(userId);
            async function getAllPublicRoutines() {
                try {
                    const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines');
                    let result = await response.json();
   
                    setRoutines(result);
                    return;
                } catch(error) {
                    console.error("Error fetching all public routines!"+error);
                }
            }
            getAllPublicRoutines();
        },[token])

        return (
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
                                                    <button className="addActivityBtn" onClick={addActivityToRoutine}>Add</button>
                                                </select>
                                                <input>Count</input>
                                                <input>Duration</input>
                                            </form> : null
                                        }
                                        {/*
                                            routine.creatorId===userId ? <Link to="/UpdateRoutine" className="routineBtn">Edit Post </Link> : null
                                        }
                                        {
                                            routine.creatorId===userId ? <Link to="/Routine" className="routineBtn" onClick={() => {deleteMyRoutine(token, routine.id)}}>Delete</Link> : null
                                        }
                                        */}
                                    </div>
                                )
                            }) : null
                }
            </div>
        )
    
}
    

