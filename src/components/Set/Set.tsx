import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Input } from "../UI";
import { useEffect, useState } from "react";

export interface ISet {
  id?: string;
  weight: number;
  reps: number;
}

interface ISetProps {
  locked?: boolean;
  set: ISet;
  setIndex: number;
  onDeleteSet: (setIndex: number) => void;
  onUpdateSet: (set: ISet, setIndex: number) => void;
}

const Set: React.FC<ISetProps> = ({
  locked = false,
  set,
  setIndex,
  onDeleteSet,
  onUpdateSet,
}) => {
  const { id, weight, reps } = set;
  const [setValue, setSetValue] = useState({ weight, reps });

  useEffect(() => {
    console.log("CHANGED THE SET VALUES - PASS THIS TO PARENT", setValue);
    onUpdateSet(setValue, setIndex);
  }, [setValue, setIndex]);

  return (
    <div key={id} className="content">
      <span className="setNumber">{(setIndex += 1)}</span>
      <span className="setWeight">
        <Input
          type="number"
          name="weight"
          value={setValue.weight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSetValue({
              weight: Number(e.target.value),
              reps: setValue.reps,
            });
          }}
        />
        kg
      </span>
      <span className="setRep">
        <Input
          type="number"
          name="reps"
          value={setValue.reps}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSetValue({
              weight: setValue.weight,
              reps: Number(e.target.value),
            });
          }}
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
