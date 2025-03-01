import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./assets/Register";
import Login from "./assets/Login";


function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken){
      setToken(savedToken);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Link to="/">Home</Link>
              <br />
              {token ? (
                <button onClick={logoutUser}>logout</button>
              ) : (
                <div>
                  <Link to="/register">register</Link>
                  <br />

                  <Link to="/login">login</Link>
                </div>
              )}
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div>
              <Link to="/">Home</Link>
              <h1>register</h1>
              <Register />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <Link to="/">Home</Link>
              <h1>login</h1>
              <Login />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
