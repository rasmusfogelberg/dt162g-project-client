const API_URL = "http://localhost:3001/workouts";

// Using the verb DELETE to update an existing Workout with an Exercise. Multiple
// Exercises can be added when updating the workout with 'batch' in the URL
export const deleteWorkout = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    return response.ok;
  } catch (error) {
    console.error("error ", error);
  }
};
