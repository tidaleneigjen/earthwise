// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
// import Blog from "./components/Blog"; // Placeholder for Blog component
// import Spirituality from "./components/Spirituality"; // Placeholder for Spirituality component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/blog" element={<Blog />} /> */}
        {/* <Route path="/spirituality" element={<Spirituality />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
