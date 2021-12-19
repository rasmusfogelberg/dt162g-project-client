import { API_URL } from "..";

// Using the verb POST to create a new Exercise
export const createExercise = async (name: string) => {
  try {
    const response = await fetch(`${API_URL}/exercises`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error ", error);
  }
};
