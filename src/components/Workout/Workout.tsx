import { useNavigate } from "react-router";

import "./workout.css";

import { IExercise } from "../../components/Exercise/Exercise";
import { calculateTotalWeight, calculateTotalSets, kilosToTons } from "../../helpers/converters";


export interface IWorkout {
  _id: string;
  name: string;
  exercises: IExercise[];
}

interface WorkoutProps {
  workoutId: string;
  name: string;
  exercises: any[];
}

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
