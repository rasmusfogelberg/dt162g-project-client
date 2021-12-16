const API_URL = "http://localhost:3001/exercises";

export const getExercises = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error occured when trying to fetch exercises.");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error", error);
  }
};
