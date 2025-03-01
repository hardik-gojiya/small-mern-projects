import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        details
      );
      if (response.data.message) {
        alert(response.data.message);
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister} method="post">
        <input
          type="text"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          placeholder="name"
        />
        <input
          type="email"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          placeholder="email"
        />
        <input
          type="tel"
          value={details.phone}
          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
          placeholder="phone"
        />
        <input
          type="password"
          value={details.password}
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          placeholder="password"
        />
        <button type="submit">register</button>
      </form>
    </div>
  );
}

export default Register;
