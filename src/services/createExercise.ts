const API_URL = "http://localhost:3001/exercises";

export const createExercise = async (name: string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error ", error);
  }
};
