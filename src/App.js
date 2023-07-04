import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./component/LandingPage";

import PresentationList from "./component/presentation/PresentationList";
import Summary from "./component/presentation/Summary";
import Speech from "./component/presentation/Speech";
import Practice from "./component/presentation/Practice";
import NewPresentation from "./component/presentation/NewPresentation";

import CoachList from "./component/coach/CoachList";
import Portfolio from "./component/coach/Portfolio";

import Notfound from "./component/Notfound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/presentation" element={<PresentationList />} />
        <Route path="/presentation/summary" element={<Summary />} />
        <Route path="/presentation/speech" element={<Speech />} />
        <Route path="/presentation/practice" element={<Practice />} />
        <Route path="/presentation/new" element={<NewPresentation />} />
        <Route path="/coach" element={<CoachList />} />
        <Route path="/coach/portfolio" element={<Portfolio />} />

        <Route path="/*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
