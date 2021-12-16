import React, { useEffect, useState } from "react";
import { Input, Button } from "../../../components/UI";

interface SearchExerciseProps {
  onSelectExercise: (exercise: any) => void;
  loading: boolean;
  exercises: any[];
}

const SearchExercise: React.FC<SearchExerciseProps> = ({
  onSelectExercise,
  loading,
  exercises,
}) => {
  const [search, setSearch] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<any[]>([]);

  useEffect(() => {
    setFilteredExercises(
      exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, exercises]);

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

  return (
    <>
      <Input
        label="Search exercise"
        placeholder="Search exercise..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      {!loading && exercises.length === 0 && (
        <div style={{ padding: "12px" }}>
          <p style={{ fontStyle: "italic" }}>
            No exercises to choose, why not create one?
          </p>
          {/* TODO: Do something with the click here? */}
          <Button style={{ backgroundColor: "orange" }} onClick={() => {}}>
            Create new exercise
          </Button>
        </div>
      )}

      {!loading && search !== "" && filteredExercises.length === 0 ? (
        <div style={{ padding: "12px" }}>
          <p style={{ fontStyle: "italic" }}>
            No matches for: <em>{search}</em>
          </p>
          <Button style={{ backgroundColor: "orange" }} onClick={() => {}}>
            Create new exercise
          </Button>
        </div>
      ) : (
        <div style={{ padding: "12px" }}>{searchResults}</div>
      )}
    </>
  );
};

export default SearchExercise;
