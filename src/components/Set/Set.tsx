import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Input } from "../UI";

/** 
 * Set component
 *   
 * 
 */

// An interface that structures what a Set contains
export interface ISet {
  id?: string;
  weight: number;
  reps: number;
}

// An interface that structures what Set-props contains
interface ISetProps {
  locked?: boolean;
  set: ISet;
  setIndex: number;
  onDeleteSet: (setIndex: number) => void;
  onUpdateSet: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Structures the layout for sets
const Set: React.FC<ISetProps> = ({
  locked = false,
  set,
  setIndex,
  onDeleteSet,
  onUpdateSet,
}) => {
  const { weight, reps } = set;

  return (
    <div className="content">
      <span className="setNumber">{(setIndex += 1)}</span>
      <span className="setWeight">
        <Input
          type="number"
          name="weight"
          value={weight}
          onChange={onUpdateSet}
        />
        kg
      </span>
      <span className="setRep">
        <Input
          type="number"
          name="reps"
          value={reps}
          onChange={onUpdateSet}
        />
        reps
      </span>
      {!locked && (
        <FontAwesomeIcon
          icon={solid("trash-alt")}
          style={{ alignSelf: "center", cursor: "pointer" }}
          onClick={() => onDeleteSet(setIndex)}
        />
      )}
    </div>
  );
};

export default Set;