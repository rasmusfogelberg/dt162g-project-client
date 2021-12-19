import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { IExercise } from "../../../../components/Exercise/Exercise";
import { Input, Button } from "../../../../components/UI";

// Interface for the search
interface SearchExerciseProps {
  onCreateNewExercise: () => void;
  onSelectExercise: (exercise: IExercise) => void;
  onDeleteExercise: (exerciseId: string) => void;
  loading: boolean;
  exercises: any[];
}

const SearchExercise: React.FC<SearchExerciseProps> = ({
  onCreateNewExercise,
  onSelectExercise,
  onDeleteExercise,
  loading,
  exercises,
}) => {
  // State for what the user has typed into the input
  const [search, setSearch] = useState("");
  // State for the filtered Exercises in the database
  const [filteredExercises, setFilteredExercises] = useState<IExercise[]>([]);

  // UseEffect that sets all Exercise names in the database and the input to
  // lowercase while filtering them
  useEffect(() => {
    setFilteredExercises(
      exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, exercises]);

  // Mapping out the results from the filtered exercises
  const searchResults = filteredExercises?.map((exercise) => {
    return (
      <div
        key={exercise._id}
        className="exerciseRow"
        onClick={() => onSelectExercise(exercise)}
      >
        {exercise.name}
        <FontAwesomeIcon
          icon={solid("trash-alt")}
          style={{ alignSelf: "center", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteExercise && onDeleteExercise(exercise._id);
          }}
        />
      </div>
    );
  });

  // JSX
  return (
    <>
      {/* Input field for search */}
      {!loading && exercises.length > 0 && (
        <Input
          label="Search exercise"
          placeholder="Search exercise..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      )}
      {/* Text and button shown if there are no Exercises in the database */}
      {!loading && exercises.length === 0 && (
        <div style={{ padding: "12px" }}>
          <p style={{ fontStyle: "italic" }}>
            No exercises to choose, why not create one?
          </p>
          <Button
            style={{ backgroundColor: "orange" }}
            onClick={onCreateNewExercise}
          >
            Create new exercise
          </Button>
        </div>
      )}

      {/* Text and button shown if there were no matching results from the search */}
      {!loading && exercises.length > 0 && filteredExercises.length === 0 ? (
        <div style={{ padding: "12px" }}>
          <p style={{ fontStyle: "italic" }}>
            No matches for: <em>{search}</em>
          </p>
          <Button
            style={{ backgroundColor: "orange" }}
            onClick={onCreateNewExercise}
          >
            Create new exercise
          </Button>
        </div>
      ) : (
        <>
          {search !== "" && (
            <div style={{ padding: "12px" }}>{searchResults}</div>
          )}
        </>
      )}
    </>
  );
};

export default SearchExercise;
