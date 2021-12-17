import { IExercise } from "../components/Exercise/Exercise";

const API_URL = "http://localhost:3001/workouts";

// Using the verb PUT to update an existing Workout with an Exercise. Multiple
// Exercises can be added when updating the workout with 'batch' in the URL
export const updateWorkout = async (id: string, exercises: IExercise[]) => {
  try {
    const response = await fetch(`${API_URL}/${id}/batch`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercises,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error ", error);
  }
};
