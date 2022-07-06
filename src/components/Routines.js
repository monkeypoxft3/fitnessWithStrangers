import React, { useEffect } from "react";

export default function Routines({ token, loggedIn, userId, routines, setRoutines }) {
    const [routineName, setRoutineName] = useState([]);
    const [routineGoal, setRoutineGoal] = useState([]);

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
    }, [token])

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
                    name: RoutineName,
                    description: RoutineGoal
                })
            })
            let data = await response.json()

        } catch (err) {
            console.error("Not created")
        }
    }


    return (
        <>
            <div id='allRoutines'>
                {routines ? routines.map(routine => {
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
                            {/* {
                                            routine.creatorId===userId ? <Link to="/UpdateRoutine" className="routineBtn">Edit Post </Link> : null
                                        }
                                        {
                                            routine.creatorId===userId ? <Link to="/Routine" className="routineBtn" onClick={() => {deleteMyRoutine(token, routine.id)}}>Delete</Link> : null
                                        } */}
                        </div>
                    )
                }) : null
                }
            </div>



    {/* //ADD ROUTINE */}

            <div>
                !loggedIn ?
                    <fieldset>
                        <legend>Add Routine</legend>
                        <div className="formAddRoutine"><center>
                            <div>Add A Monkey Pox Routine</div>
                            <br></br>
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                createRoutine()
                            }}>

                                <input type="text" placeholder="Routine name" required value={name} onChange={(event) => { setRoutineName(event.target.value) }}></input>
                                <br></br>

                                <input type="text" placeholder="Routine goal" required value={goal} onChange={(event) => { setRoutineGoal(event.target.value) }}></input>
                                <br></br>
                                <button type="submit" className="btnAddRoutine">Add Routine</button>
                            </form>
                            <Link to="/Register">Create Account</Link>
                        </center></div>
                    </fieldset>
                    </div>
        </>
    )}