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

export interface IWorkout {
  _id: string;
  name: string;
  exercises: IExercise[];
}

interface WorkoutProps {
  workoutId: string;
  name: string;
  exercises: IExercise[];
  onDeleteWorkout?: (workoutId: string) => void;
}

const Workout: React.FC<WorkoutProps> = ({
  workoutId,
  name,
  exercises,
  onDeleteWorkout,
}) => {
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
    </>
  );
};

export default Workout;
