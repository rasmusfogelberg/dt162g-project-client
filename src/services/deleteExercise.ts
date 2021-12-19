import { API_URL } from "..";

// Using the verb DELETE to delete an Exercise
export const deleteExercise = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/exercises/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return response.ok;
  } catch (error) {
    console.error("error ", error);
  }
};
