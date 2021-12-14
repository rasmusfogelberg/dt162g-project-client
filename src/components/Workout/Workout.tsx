import { useNavigate } from "react-router";

import "./workout.css";

interface WorkoutProps {
  workoutId: string;
  name: string;
  exercises: any[];
}

const kilosToTons = (kilos: number) => {
  return kilos / 1000;
};

const calculateTotalWeight = (exercises: any) => {
  let totalWeight = 0;

  exercises.forEach((exercise: any) => {
    exercise.sets.forEach((set: any) => {
      totalWeight = totalWeight + set.reps * set.weight;
    });
  });

  return totalWeight;
};

const calculateTotalSets = (exercises: any) => {
  let totalSets = 0;

  exercises.forEach((exercise: any) => {
    totalSets = totalSets + exercise.sets.length;
  });

  return totalSets;
};

const Workout: React.FC<WorkoutProps> = ({ workoutId, name, exercises }) => {
  const navigate = useNavigate();

  const totalLiftedWeight = calculateTotalWeight(exercises);
  const totalSets = calculateTotalSets(exercises);

  const handleSelectWorkout = () => {
    if (!workoutId) return;
    navigate(`/archive/${workoutId}`);
  }

  return (
    <div className="workoutItemWrapper" onClick={handleSelectWorkout}>
      <div className="workoutItemContent">
        <header className="workoutIemName">{name}</header>
        <div className="workoutItemDate">2021-12-19 at 05:52 - 07:10</div>
        <div className="exercisesWrapper">
          <div style={{ fontWeight: "bold" }}>Total lifted:</div>{" "}
          {totalLiftedWeight > 1000
            ? `${kilosToTons(totalLiftedWeight)} tons`
            : `${totalLiftedWeight} kilos`}
          <div style={{ fontWeight: "bold" }}>Total sets:</div> {totalSets}
        </div>
      </div>
    </div>
  );
};

export default Workout;
