import { useParams, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import Modal from "../../../components/UI/Modal/Modal";
import DefaultLayout from "../../../layouts/DefaultLayout";

import { Button, Input } from "../../../components/UI/";
import { ISet } from "../../../components/Set/Set";

import SearchExercise from "./components/SearchExercise";
import { IWorkout } from "../../../components/Workout/Workout";
import Exercise, { IExercise } from "../../../components/Exercise/Exercise";

import { getExercises } from "../../../services/getExercises";
import { createExercise } from "../../../services/createExercise";
import { updateWorkout } from "../../../services/updateWorkout";
import { getWorkout } from "../../../services/getWorkout";
import { deleteExercise } from "../../../services/deleteExercise";
import { Timer } from "../../../components/Timer/Timer";

/*
 * "View" When a workout is updated(created) with new exercises
 *
 */

function WorkoutDetailPage() {
  const { workoutId } = useParams();
  const navigate = useNavigate();

  // TODO REMOVE ME
  const date = new Date();
  date.setHours(date.getHours() + 1);

  // Setting states
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [newExerciseName, setNewExerciseName] = useState<string>("");

  const [workoutExercises, setWorkoutExercises] = useState<IExercise[]>([]);
  const [workoutName, setWorkoutName] = useState<string>("");

  const { pathname } = useLocation();

  // UseEffect to get Exercises currently in database
  useEffect(() => {
    // Runs once when the component is mounted, and then for every subsequent change to isOpen
    setLoading(true);
    if (!isOpen && workoutId) {
      getExercises().then((exercises) => {
        setExercises(exercises); // All the exercises, needed for search
        getWorkout(workoutId)
          .then((workout: IWorkout) => {
            if (!workout) {
              throw new Error("Workout not found");
            }
            setWorkoutName(workout.name);
            setWorkoutExercises(workout.exercises); // sets the current active workouts exercises
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error.message);
            return navigate("/");
          });
      });
    }
  }, [isOpen]); // <-- This triggers the useEffect, provided this value changes

  useEffect(() => {
    getExercises().then((exercises) => {
      setExercises(exercises);
      setRefetch(false);
      setLoading(false);
    });
  }, [refetch]);

  // OnClick when saving new exercise to database
  const handleOnSaveNewExercise = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createExercise(newExerciseName);
      setIsOpen(false);
      setNewExerciseName("");
      toast.success('Successfully created new exercise');
    } catch (error) {
      toast.error('Error while creating new exercise');
      console.error("Error while creating new exercise", error);
    }
  };

  // OnClick to add a Exercise to a Workout
  const handleAddExerciseToWorkout = (exercise: any) => {
    if (
      workoutExercises.filter(
        (workoutExercise: any) => workoutExercise._id === exercise._id
      ).length > 0
    ) {
      toast.error('Could not add exercise to workout');
      return;
    }
    setWorkoutExercises([
      ...workoutExercises,
      {
        _id: `${exercise._id}`,
        name: exercise.name,
        sets: [{ id: uuidv4(), weight: 0, reps: 0 }],
      },
    ]);
    toast.success('Added exercise successfully');
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

  const handleDeleteSavedExercise = async (exerciseId: string) => {
    if (!exerciseId) return;
    try {
      const isDeleted = await deleteExercise(exerciseId);
      toast.success('Successfully deleted exercise');
      if (!isDeleted) {
        toast.error('Could not delete exercise');
        return;
      }
      setRefetch(true);
    } catch (error) {
      console.error("Error while deleting workout", error);
    }
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
      id: uuidv4(),
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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newExercise = { ...workoutExercise };
    const newSets = [...newExercise.sets];

    //@ts-ignore
    newExercise.sets[setIndex][event.target.name] = Number(event.target.value);
    const newExercises = [...workoutExercises];

    newExercises[exerciseIndex] = newExercise;

    setWorkoutExercises(newExercises);
  };

  // Since the Workout was previously created this will just update the workout
  // with the created Exercises and their sets
  const handleUpdateWorkout = (workoutId: string) => {
    let message =
      pathname.split("/")[1] === "new" ? `Created workout` : "Updated workout";

    toast.promise(updateWorkout(workoutId, workoutExercises), {
      loading: "Saving...",
      success: message,
      error: "Workout could not be saved",
    });
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
      {!loading && workoutExercises && exercises.length > 0 && (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <header style={{ padding: "0 12px", marginBottom: "1em" }}>
            <h2>{workoutName}</h2>
            <Timer />
          </header>

          {/* Search component that is used to search for Exercises in the database */}
          <SearchExercise
            onCreateNewExercise={() => setIsOpen(!isOpen)}
            onSelectExercise={(exercise: any) =>
              handleAddExerciseToWorkout(exercise)
            }
            onDeleteExercise={(exerciseId: string) =>
              handleDeleteSavedExercise(exerciseId)
            }
            loading={loading}
            exercises={exercises}
          />

          {workoutExercises && workoutExercises.length > 0 && (
            <>
              <div style={{ padding: "12px", marginTop: "18px" }}>
                <h2>Exercises</h2>
                {workoutExercises?.map(
                  (workoutExercise: IExercise, exerciseIndex: number) => (
                    <Exercise
                      key={workoutExercise._id}
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
                        event
                      ) => {
                        handleUpdateWorkoutSet(
                          workoutExercise,
                          exerciseIndex,
                          setIndex,
                          event
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

export default WorkoutDetailPage;
