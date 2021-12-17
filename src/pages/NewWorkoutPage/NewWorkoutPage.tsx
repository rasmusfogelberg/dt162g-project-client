import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Form, Input } from "../../components/UI/";
import DefaultLayout from "../../layouts/DefaultLayout";
import { createWorkout } from "../../services/createWorkout";

/* 
 * "View" start page where user creates a workout
 *
 */

function NewWorkoutPage() {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createWorkout(workoutName).then((response: any) => {
      // Navigate to detail view for newly created workout
      navigate(`/new/${response.workout._id}`);
    })
  };

  // JSX
  return (
    <DefaultLayout>
      {/* Creates a workout and navigates the user to the workout.
      This workout is then updated with Exercises */}
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