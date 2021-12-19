import { API_URL } from "..";

// A simple fetch to get all the Exercises
export const getExercises = async () => {
  try {
    const response = await fetch(`${API_URL}/exercises`);

    if (!response.ok) {
      throw new Error("Error occured when trying to fetch exercises.");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error", error);
  }
};
