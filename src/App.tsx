import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import ArchivesPage from "./pages/ArchivePage/ArchivePage";
import WorkoutPage from "./pages/WorkoutPage/WorkoutPage";
import WorkoutDetailPage from "./pages/WorkoutPage/WorkoutDetailPage/WorkoutDetailPage";

// This file keeps track of routing (paths) to other files/views that are shown
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkoutPage />} />
        <Route path="/archive" element={<ArchivesPage />} />
        <Route path="/new/:workoutId" element={<WorkoutDetailPage />} />
        <Route path="/edit/:workoutId" element={<WorkoutDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
