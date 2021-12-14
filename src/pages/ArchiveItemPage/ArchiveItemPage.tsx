import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Exercise from "../../components/Exercise/Exercise";
import DefaultLayout from "../../layouts/DefaultLayout";

function ArchiveItemPage() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState<any>(null);

  useEffect(() => {
    const API_URL = `http://localhost:3001/workouts/${workoutId}`;
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setWorkout(json);
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchData();
  }, [workoutId]);

  return (
    <DefaultLayout>
      {workout && (
        <>
          <h2>{workout.name}</h2>
          <div>
            {workout?.exercises.map((exercise: any) => (
              <Exercise name={exercise.name} sets={exercise.sets} />
            ))}
          </div>
        </>
      )}
    </DefaultLayout>
  );
}

export default ArchiveItemPage;
