import { ISet } from "../components/Set/Set";

const API_URL = "http://localhost:3001/exercises";

// Using the verb PUT to update an existing exercise. Name and Sets are updated
// on the exercise that matches the priovded ID
export const updateExercise = async (id: string, name: string, sets: ISet[]) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
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
    console.log("error ", error);
  }
};
