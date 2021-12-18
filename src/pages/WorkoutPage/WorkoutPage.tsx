import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { Button, Form, Input } from "../../components/UI/";
import DefaultLayout from "../../layouts/DefaultLayout";
import { createWorkout } from "../../services/createWorkout";

/* 
 * "View" start page where user creates a workout
 *
 */

function WorkoutPage() {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!workoutName) {
      alert('You need a name for the workout...');
      return;
    }

    createWorkout(workoutName).then((response: any) => {
      // Navigate to detail view for newly created workout
      toast.success('Successfully created workout');
      navigate(`/new/${response.workout._id}`);
    });
  };

  // JSX
  return (
    <DefaultLayout>
      {/* Creates a workout and navigates the user to the workout.
      The workout created here is then updated with Exercises */}
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

export default WorkoutPage;