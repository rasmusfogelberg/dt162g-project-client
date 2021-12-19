import { API_URL } from "..";
import { ISet } from "../components/Set/Set";

// Using the verb PUT to update an existing Exercise. Name and Sets are updated
// on the exercise that matches the priovded ID
export const updateExercise = async (id: string, name: string, sets: ISet[]) => {
  try {
    const response = await fetch(`${API_URL}/exercises/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        sets
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error ", error);
  }
};
