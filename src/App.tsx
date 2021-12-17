import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import ArchivesPage from "./pages/ArchivePage/ArchivePage";
import NewWorkoutPage from "./pages/NewWorkoutPage/NewWorkoutPage";
import ArchiveItemPage from "./pages/ArchiveItemPage/ArchiveItemPage";
import NewWorkoutDetailPage from "./pages/NewWorkoutDetailPage/NewWorkoutDetailPage";

// This file keeps track of routing (paths) to other files/views that are shown
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewWorkoutPage />} />
        <Route path="/archive" element={<ArchivesPage />} />
        <Route path="/archive/:workoutId" element={<ArchiveItemPage />} />
        <Route path="/new/:workoutId" element={<NewWorkoutDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
