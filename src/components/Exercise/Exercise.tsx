import Set from "../Set/Set";

interface IExerciseProps {
  name: string;
  sets: any[]; // Todo: Type this
}

const Exercise: React.FC<any> = ({ name, sets }) => {
  return (
    <div className="exercise">
      <h4>{name}</h4>
      <h5>Sets</h5>
      {sets.map((set: any) => {
        return (
          <Set
            key={`${Math.random()}-${name}`}
            weight={set.weight}
            reps={set.reps}
          />
        );
      })}
    </div>
  );
};

export default Exercise;
