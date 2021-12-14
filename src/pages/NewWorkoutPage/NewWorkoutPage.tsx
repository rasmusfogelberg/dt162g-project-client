import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Form, Input } from "../../components/UI/";
import Workout from "../../components/Workout/Workout";
import DefaultLayout from "../../layouts/DefaultLayout";

const API_URL = "http://localhost:3001/workouts";

function NewWorkoutPage() {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const postData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: workoutName
          })
        });

        if (response.ok && response.status === 200) {
          const json = await response.json();
          if (json.workout) {
            // Navigate to detail view for newly created workout
            navigate(`/new/${json.workout._id}`);
          }
        }
      } catch (error) {
        console.log("error ", error);
      }
    };
    postData();
  };

  return (
    <DefaultLayout>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="workout"
          label="Workout name: "
          value={workoutName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkoutName(e.target.value)
          }
        />
        <Button type="submit">Add workout</Button>
      </Form>
    </DefaultLayout>
  );
}

export default NewWorkoutPage;
