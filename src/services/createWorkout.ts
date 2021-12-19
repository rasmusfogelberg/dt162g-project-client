import { API_URL } from "..";

// Using the verb POST to create a new Workout
export const createWorkout = async (name: string, startedDate: number) => {
  try {
    const response = await fetch(`${API_URL}/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        startedDate
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error ", error);
  }
};
