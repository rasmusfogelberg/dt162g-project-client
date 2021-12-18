import { useNavigate } from "react-router";

import "./workout.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { IExercise } from "../../components/Exercise/Exercise";
import {
  calculateTotalWeight,
  calculateTotalSets,
  kilosToTons,
} from "../../helpers/converters";
import Modal from "../UI/Modal/Modal";
import { useState } from "react";
import Button from "../UI/Button/Button";

/** 
 * The Workout component
 *   
 * 
 */

// An interface that structures what a Workout contains
export interface IWorkout {
  _id: string;
  name: string;
  startedDate: number;
  endedDate?: number;
  exercises: IExercise[];
}

// An interface that structures what Workout-props contains
interface WorkoutProps {
  workout: IWorkout;
  onDeleteWorkout?: (workoutId: string) => void;
}

// Structures the layout of a Workout and what handlers/functions it contains
const Workout: React.FC<WorkoutProps> = ({ workout, onDeleteWorkout }) => {
  const { _id: workoutId, name, startedDate, endedDate, exercises } = workout;

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const totalLiftedWeight = calculateTotalWeight(exercises);
  const totalSets = calculateTotalSets(exercises);

  const handleSelectWorkout = () => {
    if (!workoutId) return;
    navigate(`/edit/${workoutId}`);
  };

  return (
    <>
      <Modal opened={isOpen} close={() => setIsOpen(false)}>
        Are you sure?
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{ marginRight: "12px" }}
            onClick={() => {
              onDeleteWorkout && onDeleteWorkout(workoutId);
              setIsOpen(false);
            }}
          >
            Yes
          </Button>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <div className="workoutItemWrapper">
        <FontAwesomeIcon
          icon={solid("trash-alt")}
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen(true)}
        />
        <div className="workoutItemContent" onClick={handleSelectWorkout}>
          <header className="workoutIemName">{name}</header>
          <div className="workoutItemDate">
            {startedDate && new Date(startedDate).toLocaleString()} -{" "}
            {endedDate && new Date(endedDate).toLocaleString()}
          </div>
          <div className="exercisesWrapper">
            <div style={{ fontWeight: "bold" }}>Total lifted:</div>{" "}
            {totalLiftedWeight > 1000
              ? `${kilosToTons(totalLiftedWeight)} tons`
              : `${totalLiftedWeight} kilos`}
            <div style={{ fontWeight: "bold" }}>Total sets:</div> {totalSets}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workout;
