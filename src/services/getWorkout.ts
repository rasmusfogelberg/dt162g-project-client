import { API_URL } from "..";

// A simple fetch to get all the Exercises
export const getWorkout = async (workoutId: string) => {
  try {
    const response = await fetch(`${API_URL}/workouts/${workoutId}`);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
    return json;
  } catch (error: any) {
    console.error("error ", error);
  }
};
