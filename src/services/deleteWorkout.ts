// Using the verb DELETE to update an existing Workout with an Exercise. Multiple

import { API_URL } from "..";

// Exercises can be added when updating the workout with 'batch' in the URL
export const deleteWorkout = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    return response.ok;
  } catch (error) {
    console.error("error ", error);
  }
};
