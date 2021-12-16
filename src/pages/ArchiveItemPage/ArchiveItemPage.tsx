import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import DefaultLayout from "../../layouts/DefaultLayout";

import Exercise, { IExercise } from "../../components/Exercise/Exercise";
import Button from "../../components/UI/Button/Button";

function ArchiveItemPage() {
  const [locked, setLocked] = useState(false);
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
          <header
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h2>
              {workout.name}{" "}
              <FontAwesomeIcon
                icon={solid("pencil-alt")}
                style={{ alignSelf: "center", cursor: "pointer" }}
                onClick={() => setLocked(!locked)}
              />
            </h2>
          </header>
          <div>
            {workout?.exercises.map(
              (exercise: IExercise, exerciseIndex: number) => (
                <Exercise
                  locked={locked}
                  key={exercise.id}
                  exercise={exercise}
                  exerciseIndex={exerciseIndex}
                />
              )
            )}
          </div>
        </>
      )}
    </DefaultLayout>
  );
}

export default ArchiveItemPage;
