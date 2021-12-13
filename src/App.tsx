import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import ArchivesPage from "./pages/Archive";
import NewWorkoutPage from "./pages/NewWorkout";
import MainNav from "./components/Navigation/MainNav";

function App() {
  return (
    <div className="App">
      <Router>
        <MainNav />
        <body>
          <h1>Project GetFit</h1>
          <Routes>
            <Route path="/archive" element={<ArchivesPage />} />
            <Route path="/" element={<NewWorkoutPage />} />
          </Routes>
        </body>
      </Router>
    </div>
  );
}

export default App;
