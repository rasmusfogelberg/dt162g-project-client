const API_URL = "http://localhost:3001/exercises";

// Using the verb DELETE to delete an Exercise
export const deleteExercise = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return response.ok;
  } catch (error) {
    console.error("error ", error);
  }
};
