import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { v4 as uuidv4 } from "uuid";

import "./exercise.css";

import Set, { ISet } from "../Set/Set";

/** 
 * The Exercise component
 *   
 * 
 */

// An interface that structures what a Exercise contains
export interface IExercise {
  _id: string;
  name: string;
  sets: ISet[];
}

// An interface that structures what Exercise-props contains
interface IExerciseProps {
  locked?: boolean;
  exercise: IExercise;
  exerciseIndex: number;

  // Details what information is needed for handles
  onDeleteExercise?: (exerciseIndex: number) => void;
  onDeleteSet?: (
    exercise: IExercise,
    exerciseIndex: number,
    setIndex: number
  ) => void;
  onAddSet?: (exercise: IExercise, exerciseIndex: number) => void;

  onUpdateSet?: (
    exercise: IExercise,
    exerciseIndex: number,
    setIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

// Structures the layout of an Exercise
const Exercise: React.FC<IExerciseProps> = ({
  locked = false,
  exercise,
  exerciseIndex,
  onDeleteExercise,
  onDeleteSet,
  onAddSet,
  onUpdateSet,
}) => {
  const { name, sets } = exercise;
  return (
    <div key={uuidv4()} className="workoutExerciseRow">
      <header>
        {name}
        {!locked && (
          <FontAwesomeIcon
            icon={solid("trash-alt")}
            style={{ cursor: "pointer" }}
            onClick={() => onDeleteExercise && onDeleteExercise(exerciseIndex)}
          />
        )}
      </header>
      {/* The Set component that is used in the exercise */}
      {sets?.map((set: ISet, setIndex: number) => (
        <Set
          key={uuidv4()}
          locked={locked}
          set={set}
          setIndex={setIndex}
          onDeleteSet={() =>
            onDeleteSet && onDeleteSet(exercise, exerciseIndex, setIndex)
          }
          onUpdateSet={(e) => {
            onUpdateSet && onUpdateSet(exercise, exerciseIndex, setIndex, e);
          }}
        />
      ))}
      {!locked && (
        <div
          className="addSet"
          onClick={() => onAddSet && onAddSet(exercise, exerciseIndex)}
        >
          <FontAwesomeIcon icon={solid("plus")} />
          <span>Add set</span>
        </div>
      )}
    </div>
  );
};

export default Exercise;
