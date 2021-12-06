import Exercise from "../Exercise/Exercise";

const Workout: React.FC<any> = ({ name, exercises, ...rest }) => {

  return (
    <div className="workout">
      <h2>{name}</h2>
      <h3>Exercises:</h3>
      <ul>
        {exercises?.map((exercise: any) => {
          return (<Exercise key={`${Math.random()}-${exercise.name}`} name={exercise.name} sets={exercise.sets} />);
        })}
      </ul>
    </div>
  )
};

export default Workout;