import { useEffect, useState } from "react";
import "./archive.css";

import Workout, { IWorkout } from "../../components/Workout/Workout";
import DefaultLayout from "../../layouts/DefaultLayout";

/* 
 * "View" for a all the workouts in the database
 *
 */

// Setting state to an empty array
function ArchivePage() {
  const [workouts, setWorkouts] = useState([]);

  // UseEffect asynchronously fetches workouts from the API 
  // and sets them in the current state
  useEffect(() => {
    const API_URL = "http://localhost:3001/workouts";
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setWorkouts(json);
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchData();
  }, []);

  // JSX
  return (
    <DefaultLayout>
      <div className="workoutsWrapper">
        {workouts.map((workout: IWorkout) => (
          <Workout
            key={workout._id}
            workoutId={workout._id}
            name={workout.name}
            exercises={workout.exercises}
          />
        ))}
      </div>
    </DefaultLayout>
  );
}

export default ArchivePage;
