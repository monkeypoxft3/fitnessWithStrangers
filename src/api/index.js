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

// Routines ----------------------------------------------------------- (4)
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
        console.log(token,routineName,routineGoal,isPublic);
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
        console.log(data);
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
        console.error("Cannot delete what you dont create");
    }
}

export async function addActivityToRoutine(token, routineId, activityId, count, duration) {
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
// MyRoutines ---------------------------------------------------------------- (1)
export async function fetchUserRoutines(token, username) {

    try {

        const response = await fetch(`${BASE_URL}users/${username}/routines`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await response.json();

        return result;
    } catch (error) {
        console.error("Error fetching your routines!" + error);
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