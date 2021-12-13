import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import ArchivesPage from "./pages/Archive";
import NewWorkoutPage from "./pages/NewWorkout";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project GetFit</h1>
        <Router>
          <Routes>
            <Route path="/archive" element={<ArchivesPage />} />
            <Route path="/" element={<NewWorkoutPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
