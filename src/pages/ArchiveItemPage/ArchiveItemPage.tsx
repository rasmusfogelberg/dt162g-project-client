import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import DefaultLayout from "../../layouts/DefaultLayout";

import Exercise, { IExercise } from "../../components/Exercise/Exercise";
import { Button } from "../../components/UI";
import { updateWorkout } from "../../services/updateWorkout";

/*
 * "View" for a single workout when clicked in the archives
 *
 */

const styles = {
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
};

// Using states
function ArchiveItemPage() {
  const [locked, setLocked] = useState(true);
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState<any>(null);

  // UseEffect that will load the workout from the provided ID when
  // the component is "mounted". When something is updated React
  // will update the workouts content accordingly
  useEffect(() => {
    const API_URL = `http://localhost:3001/workouts/${workoutId}`;
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setWorkout(json);
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchData();
  }, [workoutId]);

  // OnClick to delete an Exercise from a Workout
  const handleDeleteExercise = (workout: any, exerciseIndex: number) => {
    const theWorkout = { ...workout };

    theWorkout.exercises = theWorkout.exercises.filter(
      (_exercise: IExercise, index: number) => exerciseIndex !== index
    );

    setWorkout(theWorkout);

  };

  const handleUpdateWorkout = (workoutId: string) => {
    const currentExercises = workout.exercises
    updateWorkout(workoutId, currentExercises);
  };

  // JSX code for the layout of the page
  return (
    <DefaultLayout>
      {workout && (
        <>
          <header style={styles.header}>
            <h2>
              {workout.name}{" "}
              <FontAwesomeIcon
                icon={solid("pencil-alt")}
                style={{ alignSelf: "center", cursor: "pointer" }}

                onClick={() => setLocked(!locked)}
              />
            </h2>
          </header>
          <div>
            {workout?.exercises.map(
              (exercise: IExercise, exerciseIndex: number) => (
                <Exercise
                  locked={locked}
                  key={exercise._id}
                  exercise={exercise}
                  exerciseIndex={exerciseIndex}
                  onDeleteExercise={() =>
                    handleDeleteExercise(workout, exerciseIndex)
                  }
                />
              )
            )}
          </div>
          {workoutId && (
                /* Button to save all the changes in the Workout */
                <Button
                  onClick={() => {
                    handleUpdateWorkout(workoutId);
                  }}
                >
                  Save Workout
                </Button>
              )}
        </>
      )}
    </DefaultLayout>
  );
}

export default ArchiveItemPage;
