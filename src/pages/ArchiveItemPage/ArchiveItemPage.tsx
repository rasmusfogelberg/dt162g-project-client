import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import DefaultLayout from "../../layouts/DefaultLayout";

import Exercise, { IExercise } from "../../components/Exercise/Exercise";
import { Button } from "../../components/UI";
import { updateWorkout } from "../../services/updateWorkout";
import { ISet } from "../../components/Set/Set";

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
    const newWorkout = { ...workout };

    newWorkout.exercises = newWorkout.exercises.filter(
      (_exercise: IExercise, index: number) => exerciseIndex !== index
    );

    setWorkout(newWorkout);
  };

  // OnClick to delete a single Set from an Exercise
  const handleDeleteSet = (
    workoutExercise: IExercise,
    exerciseIndex: number,
    setIndex: number
  ) => {
    const newWorkout = { ...workout };
    const newExercise = { ...workoutExercise };

    newExercise.sets = newExercise.sets.filter(
      (_set: ISet, index: number) => setIndex !== index
    );

    const newExercises = [...workout.exercises]; // Copy all the exercises in state

    // Replace our modified new exercise (which has the set removed)
    // and replace the exercise at the index

    newExercises[exerciseIndex] = newExercise;

    newWorkout.exercises = newExercises;

    setWorkout(newWorkout);
  };

  const handleUpdateWorkout = (workoutId: string) => {
    const currentExercises = workout.exercises;
    updateWorkout(workoutId, currentExercises);
  };

  const theClog = () => {
    console.log(workout);

  }
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
                  /* OnClick to delete the Set */
                  onDeleteSet={(workoutExercise, exerciseIndex, setIndex) =>
                    handleDeleteSet(workoutExercise, exerciseIndex, setIndex)
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
          <Button
            onClick={() => {
              theClog();
            }}
          >
            Test Clicker
          </Button>
        </>
      )}
    </DefaultLayout>
  );
}

export default ArchiveItemPage;
