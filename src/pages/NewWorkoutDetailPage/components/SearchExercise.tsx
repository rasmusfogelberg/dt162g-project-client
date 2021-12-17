import React, { useEffect, useState } from "react";
import { Input, Button } from "../../../components/UI";
import { IExercise } from "../../../components/Exercise/Exercise";

// Interface for the search
interface SearchExerciseProps {
  onCreateNewExercise: () => void;
  onSelectExercise: (exercise: any) => void;
  loading: boolean;
  exercises: any[];
}

const SearchExercise: React.FC<SearchExerciseProps> = ({
  onCreateNewExercise,
  onSelectExercise,
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
      </div>
    );
  });

  // JSX
  return (
    <>
    {/* Input filed for search */}
      <Input
        label="Search exercise"
        placeholder="Search exercise..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      {/* Text and button shown if there are no Exercises in the database */}
      {!loading && exercises.length === 0 && (
        <div style={{ padding: "12px" }}>
          <p style={{ fontStyle: "italic" }}>
            No exercises to choose, why not create one?
          </p>
          <Button style={{ backgroundColor: "orange" }} onClick={onCreateNewExercise}>
            Create new exercise
          </Button>
        </div>
      )}

        {/* Text and button shown if there were no matching results from the search */}
      {!loading && filteredExercises.length === 0 ? (
        <div style={{ padding: "12px" }}>
          <p style={{ fontStyle: "italic" }}>
            No matches for: <em>{search}</em>
          </p>
          <Button style={{ backgroundColor: "orange" }} onClick={onCreateNewExercise}>
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
