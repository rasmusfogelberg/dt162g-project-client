import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import DefaultLayout from "../../layouts/DefaultLayout";

import Modal from "../../components/UI/Modal/Modal";
import { Button, Input } from "../../components/UI/";

import Exercise, { IExercise } from "../../components/Exercise/Exercise";
import { ISet } from "../../components/Set/Set";

import SearchExercise from "./components/SearchExercise";

import { getExercises } from "../../services/getExercises";
import { createExercise } from "../../services/createExercise";
import { updateWorkout } from "../../services/updateWorkout";

/* 
 * "View" When a workout is updated(created) with new exercises
 *
 */

function NewWorkoutDetailPage() {
  const { workoutId } = useParams();

  // Setting states
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [exercises, setExercises] = useState<any[]>([]);
  const [newExerciseName, setNewExerciseName] = useState("");

  const [workoutExercises, setWorkoutExercises] = useState<any>([]);

  // UseEffect to get Exercises currently in database
  useEffect(() => {
    setLoading(true);
    if (!isOpen) {
      getExercises().then((exercises) => {
        setExercises(exercises);
        setLoading(false);
      });
    }
  }, [isOpen]);

  // OnClick when saving new exercise to database
  const handleOnSaveNewExercise = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createExercise(newExerciseName);
      setIsOpen(false);
    } catch (error) {
      console.log("Error while creating new exercise", error);
    }
  };

  // OnClick to add a Exercise to a Workout
  const handleAddExerciseToWorkout = (exercise: any) => {
    if (
      workoutExercises.filter(
        (workoutExercise: any) => workoutExercise.id === exercise._id
      ).length > 0
    ) {
      return;
    }
    setWorkoutExercises([
      ...workoutExercises,
      {
        _id: `${exercise._id}`,
        name: exercise.name,
        sets: [{ weight: 0, reps: 0 }],
      },
    ]);
  };

  // OnClick to delete an Exercise from a Workout
  const handleDeleteExercise = (exerciseIndex: number) => {
    let newExercises = [...workoutExercises];

    let filteredExercises = newExercises.filter(
      (exercise: any, index: number) => {
        return exerciseIndex !== index;
      }
    );

    setWorkoutExercises(filteredExercises);
  };

  // OnClick to add a Set to an Exercise that is in a Workout
  const handleAddExerciseSetToWorkout = (
    workoutExercise: any,
    exerciseIndex: number
  ) => {
    // Make copy of current state
    const newSets = [...workoutExercise.sets];
    // Now push new item to the copy of the current state (doesn't modify state directly!)
    newSets.push({
      weight: 0,
      reps: 0,
    });

    // Again, make a copy of the current state
    const newExercise = { ...workoutExercise };

    // Set the sets to our updated copy above, again this is a copy of the exercise in state
    newExercise.sets = newSets;

    // Yet again, make a copy of all the current exercises in the state
    const newExercises = [...workoutExercises];

    // Now, given the current index of the exercise that has added a new set to,
    // replace that with the new copy of the exercise
    newExercises[exerciseIndex] = newExercise;

    // Update the state with the updated copy of all the exercises
    setWorkoutExercises(newExercises);
  };

  // OnClick to delete a single Set from an Exercise
  const handleDeleteSet = (
    workoutExercise: IExercise,
    exerciseIndex: number,
    setIndex: number
  ) => {
    const newExercise = { ...workoutExercise };

    newExercise.sets = newExercise.sets.filter(
      (_set: ISet, index: number) => setIndex !== index
    );

    const newExercises = [...workoutExercises];

    newExercises[exerciseIndex] = newExercise;

    setWorkoutExercises(newExercises);
  };

  // Onclick that will update the set for the Exercise in the Workout
  const handleUpdateWorkoutSet = (
    workoutExercise: IExercise,
    exerciseIndex: number,
    setIndex: number,
    updatedSet: ISet
  ) => {
    const newExercise = { ...workoutExercise };
    const newSets = [...newExercise.sets];

    newSets[setIndex] = updatedSet;
    newExercise.sets = newSets;

    const newExercises = [...workoutExercises];

    newExercises[exerciseIndex] = newExercise;
    setWorkoutExercises(newExercises);
  }

  // Since the Workout was previously created this will just update the workout
  // with the created Exercises and their sets
  const handleUpdateWorkout = (workoutId: string) => {
    updateWorkout(workoutId, workoutExercises);
  };
  

  return (
    <DefaultLayout>
      {/* Modal that is shown when creating a new Exercise */}
      <Modal opened={isOpen} close={() => setIsOpen(false)}>
        <Input
          label="Name the exercise"
          placeholder="Put the exercise name here..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewExerciseName(e.target.value)
          }
          value={newExerciseName}
        />
        {/* Button to save the created Exercise in the modal to the database */}
        <Button
          style={{ backgroundColor: "forestgreen", color: "whitesmoke" }}
          onClick={handleOnSaveNewExercise}
        >
          Save
        </Button>
      </Modal>
      {loading && <p>Loading exercises...</p>}
      {!loading && (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {/* Search component that is used to search for Exercises in the database */}
          <SearchExercise
            onCreateNewExercise={() => setIsOpen(!isOpen)}
            onSelectExercise={(exercise: any) =>
              handleAddExerciseToWorkout(exercise)
            }
            loading={loading}
            exercises={exercises}
          />

          {workoutExercises.length > 0 && (
            <>
              <div style={{ padding: "12px", marginTop: "18px" }}>
                <h2>Exercises</h2>
                {workoutExercises?.map(
                  (workoutExercise: any, exerciseIndex: number) => (
                    <Exercise
                      exercise={workoutExercise}
                      exerciseIndex={exerciseIndex}
                      /* Onclick to delete the Exercise */
                      onDeleteExercise={() =>
                        handleDeleteExercise(exerciseIndex)
                      }
                      /* OnClick to delete the Set */
                      onDeleteSet={(workoutExercise, exerciseIndex, setIndex) =>
                        handleDeleteSet(
                          workoutExercise,
                          exerciseIndex,
                          setIndex
                        )
                      }
                      /* OnClick to add a set to the Exercise in the Workout */
                      onAddSet={() =>
                        handleAddExerciseSetToWorkout(
                          workoutExercise,
                          exerciseIndex
                        )
                      }
                      onUpdateSet={(
                        workoutExercise,
                        exerciseIndex,
                        setIndex,
                        updatedSet
                      ) => {
                        handleUpdateWorkoutSet(
                          workoutExercise,
                          exerciseIndex,
                          setIndex,
                          updatedSet
                        );
                      }}
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
        </div>
      )}
    </DefaultLayout>
  );
}

export default NewWorkoutDetailPage;
