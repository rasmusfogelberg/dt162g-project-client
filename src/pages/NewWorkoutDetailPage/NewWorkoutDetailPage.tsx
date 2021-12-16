import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./newWorkoutDetailPage.css";

import DefaultLayout from "../../layouts/DefaultLayout";

import Modal from "../../components/UI/Modal/Modal";
import { Button, Input } from "../../components/UI/";

import SearchExercise from "./components/SearchExercise";

const API_URL = "http://localhost:3001/exercises";

function NewWorkoutDetailPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [exercises, setExercises] = useState<any[]>([]);
  const [newExerciseName, setNewExerciseName] = useState("");

  const [workoutExercises, setWorkoutExercises] = useState<any>([]);

  useEffect(() => {
    setLoading(true);

    const fetchExercises = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Error occured when trying to fetch exercises.");
        }

        const json = await response.json();

        setExercises(json);
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchExercises();
  }, []);

  const handleOnSaveNewExercise = (event: React.FormEvent) => {
    event.preventDefault();

    const createExercise = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newExerciseName,
          }),
        });

        if (response.ok && response.status === 200) {
          await response.json();
          setIsOpen(false);
        }
      } catch (error) {
        console.log("error ", error);
      }
    };
    createExercise();
  };

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
        id: `${exercise._id}`,
        name: exercise.name,
        sets: [{ weight: 0, reps: 0 }],
      },
    ]);
  };

  const handleDeleteExercise = (exerciseIndex: number) => {
    let newExercises = [...workoutExercises];

    let filteredExercises = newExercises.filter(
      (exercise: any, index: number) => {
        return exerciseIndex !== index;
      }
    );

    setWorkoutExercises(filteredExercises);
  };

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

    // Now, given the current index of the exercise that we've added a new set to,
    // replace that with our new copy of the exercise
    newExercises[exerciseIndex] = newExercise;

    // Update the state with our updated copy of all the exercises
    setWorkoutExercises(newExercises);
  };

  const handleDeleteSet = (
    workoutExercise: any,
    exerciseIndex: number,
    setIndex: number
  ) => {
    const newExercise = { ...workoutExercise };

    newExercise.sets = newExercise.sets.filter(
      (set: any, index: number) => setIndex !== index
    );

    const newExercises = [...workoutExercises];

    newExercises[exerciseIndex] = newExercise;

    setWorkoutExercises(newExercises);
  };

  return (
    <DefaultLayout>
      <Modal opened={isOpen} close={() => setIsOpen(false)}>
        <Input
          label="Name the exercise"
          placeholder="Put the exercise name here..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewExerciseName(e.target.value)
          }
          value={newExerciseName}
        />
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
          <SearchExercise
            onSelectExercise={(exercise: any) =>
              handleAddExerciseToWorkout(exercise)
            }
            loading={loading}
            exercises={exercises}
          />

          <div style={{ padding: "12px", marginTop: "18px" }}>
            <h2>Exercises</h2>
            {workoutExercises?.map(
              (workoutExercise: any, exerciseIndex: number) => (
                <div
                  key={Math.random() + workoutExercise.name}
                  className="workoutExerciseRow"
                >
                  <header>
                    {workoutExercise.name}
                    <FontAwesomeIcon
                      icon={solid("trash-alt")}
                      onClick={() => handleDeleteExercise(exerciseIndex)}
                    />
                  </header>
                  {workoutExercise?.sets.map((set: any, setIndex: number) => (
                    <div key={set._id} className="content">
                      <span className="setNumber">{setIndex}</span>
                      <span className="setWeight">{set.weight} kg</span>
                      <span className="setRep">{set.reps} reps</span>
                      <FontAwesomeIcon
                        icon={solid("trash-alt")}
                        style={{ alignSelf: "center" }}
                        onClick={() =>
                          handleDeleteSet(
                            workoutExercise,
                            exerciseIndex,
                            setIndex
                          )
                        }
                      />
                    </div>
                  ))}
                  <div
                    className="addSet"
                    onClick={() =>
                      handleAddExerciseSetToWorkout(
                        workoutExercise,
                        exerciseIndex
                      )
                    }
                  >
                    <FontAwesomeIcon icon={solid("plus")} />
                    <span>Add set</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default NewWorkoutDetailPage;
