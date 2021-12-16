import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./exercise.css";

import Set, { ISet } from "../Set/Set";

interface IExercise {
  id: string;
  name: string;
  sets: ISet[];
}

interface IExerciseProps {
  exercise: IExercise;
  exerciseIndex: number;

  onDeleteExercise: (exerciseIndex: number) => void;
  onDeleteSet: (exercise: any, exerciseIndex: number, setIndex: number) => void;
  onAddSet: (exercise: any, exerciseIndex: number) => void;
}

const Exercise: React.FC<IExerciseProps> = ({
  exercise,
  exerciseIndex,
  onDeleteExercise,
  onDeleteSet,
  onAddSet,
}) => {
  const { id, name, sets } = exercise;
  return (
    <div key={id} className="workoutExerciseRow">
      <header>
        {name}
        <FontAwesomeIcon
          icon={solid("trash-alt")}
          style={{ cursor: "pointer" }}
          onClick={() => onDeleteExercise(exerciseIndex)}
        />
      </header>
      {sets?.map((set: ISet, setIndex: number) => (
        <Set
          set={set}
          setIndex={setIndex}
          onDeleteSet={() => onDeleteSet(exercise, exerciseIndex, setIndex)}
        />
      ))}
      <div className="addSet" onClick={() => onAddSet(exercise, exerciseIndex)}>
        <FontAwesomeIcon icon={solid("plus")} />
        <span>Add set</span>
      </div>
    </div>
  );
};

export default Exercise;
