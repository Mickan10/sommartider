import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;

    // Rensa gamla fel
    setUsernameError("");
    setPasswordError("");

    if (username !== "admin") {
      setUsernameError("Fel användarnamn");
      valid = false;
    }

    if (password !== "password") {
      setPasswordError("Fel lösenord");
      valid = false;
    }

    if (valid) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/admin");
    }
  };

  return (
    <div className="login-page">
      <h2>Logga in som admin</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <p className="error">{usernameError}</p>}

        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error">{passwordError}</p>}

        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}
