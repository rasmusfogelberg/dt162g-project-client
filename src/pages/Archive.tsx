import { useEffect, useState } from "react";
import "./archive.css";

import Workout from "../components/Workout/Workout";

function ArchivesPage() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const API_URL = "http://localhost:3001/workouts";
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setWorkouts(json);
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="moveMeLaterWrapper">
      <div className="workoutsWrapper">
        {workouts.map((workout: any) => (
          <Workout
            key={workout._id}
            workoutId={workout._id}
            name={workout.name}
            exercises={workout.exercises}
          />
        ))}
      </div>
    </div>
  );
}

export default ArchivesPage;
