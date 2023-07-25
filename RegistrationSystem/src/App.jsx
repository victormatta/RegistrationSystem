import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Body from "./Components/Body/BodyForm/Body";
import UsersNavBar from "./Components/Users/UsersNavBar/UserNav";
import Users from "./Components/Users/UsersBody/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <NavBar />
              <Body />
            </div>
          }
        />
        <Route
          path="/users"
          element={
            <div className="App">
              <UsersNavBar />
              <Users />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
