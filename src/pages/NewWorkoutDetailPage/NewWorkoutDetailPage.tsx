import React, { useEffect, useState } from "react";

import { Button, Form, Input } from "../../components/UI/";

import Workout from "../../components/Workout/Workout";
import DefaultLayout from "../../layouts/DefaultLayout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Modal from "../../components/UI/Modal/Modal";
import "./newWorkoutDetailPage.css";

const API_URL = "http://localhost:3001/exercises";

function NewWorkoutDetailPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [exercises, setExercises] = useState<any[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<any[]>([]);
  const [newExerciseName, setNewExerciseName] = useState("");

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
           const json = await response.json();
           setIsOpen(false);
         }
       } catch (error) {
         console.log("error ", error);
       }
     };
     createExercise();
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
                  className="exerciseRow"
                  onClick={() => {
                    console.log('Hallu');
                  }}
                >
                  {exercise.name}
                  <FontAwesomeIcon icon={solid("circle-question")} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </DefaultLayout>
  );
}

export default NewWorkoutDetailPage;
