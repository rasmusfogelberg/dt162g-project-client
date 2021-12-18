import { IExercise } from "../components/Exercise/Exercise";
import { ISet } from "../components/Set/Set";

/** 
 * Helper that will make calculations for overview of a completed workout
 *   
 * 
 */

export const kilosToTons = (kilos: number) => {
  return kilos / 1000;
};

export const calculateTotalWeight = (exercises: IExercise[]) => {
  let totalWeight = 0;

  exercises.forEach((exercise: IExercise) => {
    exercise.sets.forEach((set: ISet) => {
      totalWeight = totalWeight + set.reps * set.weight;
    });
  });

  return totalWeight;
};

export const calculateTotalSets = (exercises: IExercise[]) => {
  let totalSets = 0;

  exercises.forEach((exercise: IExercise) => {
    totalSets = totalSets + exercise.sets.length;
  });

  return totalSets;
};
