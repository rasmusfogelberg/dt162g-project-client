import { API_URL } from "..";
import { IExercise } from "../components/Exercise/Exercise";

// Using the verb PUT to update an existing Workout with an Exercise. Multiple
// Exercises can be added when updating the workout with 'batch' in the URL
export const updateWorkout = async (
  id: string,
  name: string,
  exercises: IExercise[],
  startedDate: number,
  endedDate?: number
) => {
  try {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercises,
        startedDate,
        endedDate,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error ", error);
  }
};
