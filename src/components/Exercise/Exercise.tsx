import Set from "../Set/Set";

const Exercise: React.FC<any> = ({ name, sets, ...rest }) => {
  return (
    <li className="exercise">
      <h4>{name}</h4>
      <hr />
      <h6>Sets</h6>
      {sets.map((set: any) => {
        return (<Set key={`${Math.random()}-${name}`} weight={set.weight} reps={set.reps} />);
      })}
    </li>
  )
};

export default Exercise;