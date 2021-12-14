import React, { useEffect, useState } from "react";

import { Button, Input } from "../../components/UI/";

import DefaultLayout from "../../layouts/DefaultLayout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Modal from "../../components/UI/Modal/Modal";
import "./newWorkoutDetailPage.css";

const API_URL = "http://localhost:3001/exercises";

/* 
                    TODO: Change this console log to create and exercise with that name
                    and then have 1 set ready with weight and reps ready to be filled in
                    Also show a new button to add more sets.

                    Ideas how to do this:
                    - Add div with empty array/object above searchbar. When the user adds
                    a new exercise name it will be stored in the object above and show
                    exercise name and a row for a set. Under this set is a save-button that
                    will save set and add a field for a new one.
                    

                    Worse idea:
                    - Add a new page for adding a exercise with sets. Would be able to use
                    workout ID and exercise ID to keep track of it.
 */

function NewWorkoutDetailPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [exercises, setExercises] = useState<any[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<any[]>([]);
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

  useEffect(() => {
    setFilteredExercises(
      exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, exercises]);

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
    setWorkoutExercises([
      ...workoutExercises,
      {
        id: `${Math.random()}-${exercise._id}`,
        name: exercise.name,
        sets: [{ weight: 0, reps: 0 }],
      },
    ]);
  };

  const handleAddExerciseSetToWorkout = () => {
    console.log("This will add a set to the exercise, not yet implemented 😂");
    // TODO: pass the exercise that was clicked, then add a
    // new blank set to the exercise -> sets array using a
    // {weight: 0, reps: 0} object
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
          <Input
            label="Search exercise"
            placeholder="Search exercise..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          {!loading && exercises.length === 0 && (
            <div style={{ padding: "12px" }}>
              <p style={{ fontStyle: "italic" }}>
                No exercises to choose, why not create one?
              </p>
              <Button style={{ backgroundColor: "orange" }} onClick={() => {}}>
                Create new exercise
              </Button>
            </div>
          )}

          {!loading && search !== "" && filteredExercises.length === 0 ? (
            <div style={{ padding: "12px" }}>
              <p style={{ fontStyle: "italic" }}>
                No matches for: <em>{search}</em>
              </p>
              <Button
                style={{ backgroundColor: "orange" }}
                onClick={() => setIsOpen(!isOpen)}
              >
                Create new exercise
              </Button>
            </div>
          ) : (
            <div style={{ padding: "12px" }}>
              {filteredExercises?.map((exercise) => (
                <div
                  key={exercise._id}
                  className="exerciseRow"
                  onClick={() => {
                    handleAddExerciseToWorkout(exercise);
                  }}
                >
                  {exercise.name}
                  <FontAwesomeIcon icon={solid("circle-question")} />
                </div>
              ))}
            </div>
          )}
          <div style={{ padding: "12px", marginTop: "18px" }}>
            <h2>Exercises</h2>
            {workoutExercises?.map((workoutExercise: any) => (
              <div
                key={Math.random() + workoutExercise.name}
                className="workoutExerciseRow"
              >
                <header>
                  {workoutExercise.name}
                  <FontAwesomeIcon icon={solid("circle-question")} />
                </header>
                {workoutExercise?.sets.map((set: any) => (
                  <div key={set._id} className="content">
                    <span className="setNumber">1</span>
                    <span className="setWeight">{set.weight} kg</span>
                    <span className="setRep">{set.reps} reps</span>
                  </div>
                ))}
                <div
                  className="addSet"
                  onClick={() => handleAddExerciseSetToWorkout()}
                >
                  <FontAwesomeIcon icon={solid("plus")} />
                  <span>Add set</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default NewWorkoutDetailPage;
