import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface ISet {
  id?: string;
  weight: number;
  reps: number;
}

interface ISetProps {
  set: ISet;
  setIndex: number;
  onDeleteSet: (setIndex: number) => void;
}

const Set: React.FC<ISetProps> = ({ set, setIndex, onDeleteSet }) => {
  const { id, weight, reps } = set;
  return (
    <div key={id} className="content">
      <span className="setNumber">{setIndex}</span>
      <span className="setWeight">{weight} kg</span>
      <span className="setRep">{reps} reps</span>
      <FontAwesomeIcon
        icon={solid("trash-alt")}
        style={{ alignSelf: "center", cursor: "pointer" }}
        onClick={() => onDeleteSet(setIndex)}
      />
    </div>
  );
};

export default Set;
