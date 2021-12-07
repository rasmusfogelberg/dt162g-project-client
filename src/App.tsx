import React, { useState } from 'react';
import './App.css';
import Button from './components/UI/Button/Button';
import Form from './components/UI/Form/Form';
import Input from './components/UI/Input/Input';
import Workout from './components/Workout/Workout';

interface AppState {
  count: number;
}

function App() {
  const [count, setCount] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workouts, setWorkouts] = useState([
    { name: "Workout Of Doom", exercises: [{ name: 'Bench Press', sets: [{ weight: 20.0, reps: 12 }, { weight: 25.0, reps: 8 }, { weight: 25.5, reps: 10 }] }] },
    { name: "Other Workout", exercises: [{ name: 'Overhead Press', sets: [{ weight: 20.0, reps: 12 }, { weight: 25.0, reps: 8 }, { weight: 25.5, reps: 10 }] }] },
    { name: "Yet Another Workout", exercises: [{ name: 'Triceps Push-Down', sets: [{ weight: 20.0, reps: 12 }, { weight: 25.0, reps: 8 }, { weight: 25.5, reps: 10 }] }] },
    { name: "Last Workout", exercvises: [{ name: 'Preacher Curl', sets: [{ weight: 20.0, reps: 12 }, { weight: 25.0, reps: 8 }, { weight: 25.5, reps: 10 }] }] }
  ]);

  function handleClick() {
    // Update the state
    setIsWorkoutActive(!isWorkoutActive);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Project GetFit
        </h1>
        <Form>
          <Input type="text" name="workout" label="Workout name: " />
          <Button onClick={(e) => e.preventDefault()} type="submit">Add workout</Button>
        </Form>
        {isWorkoutActive && workouts.map((workout) => {
          return (
            <Workout key={`${Math.random()}-${workout.name}`} name={workout.name} exercises={workout.exercises} />
          )
        })}
        <Button onClick={() => handleClick()}>{isWorkoutActive ? 'Save' : 'Start'} Workout</Button>
      </header>
    </div>
  );
};

export default App;