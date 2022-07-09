export const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api/';

// Login/Register ----------------------------------------------------- (2)
export async function loginUser(username, password) {
    try {
      const response = await fetch(`${BASE_URL}users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
      })
      let result = await response.json()
      console.log(result)
      return result;
    } catch (err) {
      console.log("Ahh couldn't log in!! " + err)
    }
  }

export async function registerUser(username, password) {

    try {

      const response = await fetch(`${BASE_URL}users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      let result = await response.json()
      console.log(result)
      return result;
    } catch (err) {
      console.log("Could not register " + err)
    }
  }

// Routines ----------------------------------------------------------- (7)
export async function fetchAllPublicRoutines() {

    try {
        const response = await fetch(`${BASE_URL}routines`);
        let result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching all public routines!" + error);
    }
}

export async function createRoutine(token, routineName, routineGoal, isPublic) {
    try {
        const response = await fetch(`${BASE_URL}routines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({
                name: routineName,
                goal: routineGoal,
                isPublic: isPublic
            })
        })
        let data = await response.json();
        return data;
    } catch (err) {
        console.error("Not created");
    }
}

export async function deleteRoutine(token, id) {
    try {
        const response = await fetch(`${BASE_URL}routines/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        let data = await response.json();
        return data;
    } catch (err) {
        console.error("Cannot delete routine that you dont create");
    }
}

export async function addActivityToRoutine(token, routineId, count, duration) {
    try {
        const response = await fetch(`${BASE_URL}routines/${routineId}/activities`, {
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
        let data = await response.json();
        return data;
    } catch (err) {
        console.error("Error adding activity to routine;" + err);
    }
}

export async function editRoutine(token, routineId, routineName, routineGoal, isPublic) {
    try {
        const response = await fetch(`${BASE_URL}routines/${routineId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({
                name: routineName,
                goal: routineGoal,
                isPublic: isPublic
            })
        })
        let data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.error("Error editing routine;" + err);
    }
}


export async function editActivity(token, routineActivityId, count, duration) {
    try {
        const response = await fetch(`${BASE_URL}routine_activities/${routineActivityId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({
                count: count,
                duration: duration
            })
        })
        let data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.error("Error editing activity;" + err);
    }
}

export async function deleteActivity(token, routineActivityId) {
    try {
        const response = await fetch(`${BASE_URL}routine_activities/${routineActivityId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        let data = await response.json();
        return data;
    } catch (err) {
        console.error("Cannot delete activity from routine that you didn't create");
    }
}

// Activities ---------------------------------------------------------------- (2)
export async function fetchAllActivities() {
    try {
        const response = await fetch(`${BASE_URL}activities`);
        let data = await response.json();
        return data;
    }
    catch (err) {
        console.log(error)
    }
}

export async function createActivity(token, activityName, activityDescription) {
    try {
        const response = await fetch(`${BASE_URL}activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({
                name: activityName,
                description: activityDescription
            })
        })
        let data = await response.json();
        return data;

    } catch (err) {
        console.error("Not created");
    }
}