import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });
    setMessage(response.data.message);
    localStorage.setItem("token", response.data.token);
    alert("logged in succesfully");
    navigate("/")
  };

  return (
    <div>
      {message && <h1>{message}</h1>}
      <form onSubmit={handleLogin} method="post">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
