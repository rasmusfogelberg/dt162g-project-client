import { useEffect, useState } from "react";
import "./archive.css";

import Workout, { IWorkout } from "../../components/Workout/Workout";
import DefaultLayout from "../../layouts/DefaultLayout";
import { deleteWorkout } from "../../services/deleteWorkout";

/*
 * "View" for a all the workouts in the database
 *
 */

const API_URL = "http://localhost:3001/workouts";

const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error ", error);
  }
};

// Setting state to an empty array
function ArchivePage() {
  const [refetch, setRefetch] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  // UseEffect asynchronously fetches workouts from the API
  // and sets them in the current state
  useEffect(() => {
    fetchData().then((workouts) => {
      setWorkouts(workouts);
      setRefetch(false);
    });
  }, [refetch]);

  const handleDeleteWorkout = async (workoutId: string) => {
    if (!workoutId) return;
    try {
      const isDeleted = await deleteWorkout(workoutId);
      if (!isDeleted) {
        return;
      }
      setRefetch(true);
    } catch (error) {
      console.log("Error while deleting workout", error);
    }
  };

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
            onDeleteWorkout={(workoutId: string) =>
              handleDeleteWorkout(workoutId)
            }
          />
        ))}
      </div>
    </DefaultLayout>
  );
}

export default ArchivePage;
