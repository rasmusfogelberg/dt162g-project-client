import { useEffect, useState } from "react";
import "./archive.css";

import Workout, { IWorkout } from "../../components/Workout/Workout";
import DefaultLayout from "../../layouts/DefaultLayout";
import { deleteWorkout } from "../../services/deleteWorkout";
import toast from "react-hot-toast";

/*
 * "View" for a all the workouts in the database
 *
 */

const API_URL = "http://localhost:3001/workouts";

const getWorkouts = async () => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error ", error);
  }
};

// Setting state to an empty array
function ArchivePage() {
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  // UseEffect asynchronously fetches workouts from the API
  // and sets them in the current state
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const workouts = await getWorkouts();
      setWorkouts(workouts);
      setRefetch(false);
      setLoading(false);
    };
    fetchData();
  }, [refetch]);

  const handleDeleteWorkout = async (workoutId: string) => {
    if (!workoutId) return;
    try {
      const isDeleted = await deleteWorkout(workoutId);
      if (!isDeleted) {
        return;
      }
      toast.success("Successfully deleted archived workout");
      setRefetch(true);
    } catch (error) {
      toast.error("Error while deleting archived workout");
      console.error("Error while deleting workout", error);
    }
  };

  // JSX
  return (
    <DefaultLayout>
      <div className="workoutsWrapper">
        {loading && <p>Loading...</p>}
        {!loading && workouts.length === 0 && (
          <h3>There's no history here, why don't you go and workout?</h3>
        )}
        {!loading &&
          workouts.length > 0 &&
          workouts.map(
            (workout: IWorkout) =>
              workout.endedDate && (
                <Workout
                  key={workout._id}
                  workout={workout}
                  onDeleteWorkout={(workoutId: string) =>
                    handleDeleteWorkout(workoutId)
                  }
                />
              )
          )}
      </div>
    </DefaultLayout>
  );
}

export default ArchivePage;
