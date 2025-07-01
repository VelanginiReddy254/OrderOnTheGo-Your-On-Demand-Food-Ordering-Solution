import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();

      if (json.success) {
        console.log("Saving to localStorage userEmail:", credentials.email);  // <--- Add this line
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("userEmail", credentials.email);
        alert("Login successful ✅");
        navigate("/");
      }

      else {
        alert("Login failed ❌\n" + (json.error || "Invalid credentials."));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error: " + error.message);
    }
  };

  return (
    <div className='container mt-5'>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mb-2">Login</button>
        <Link to="/signup" className="btn btn-danger w-100">New User? Sign Up</Link>
      </form>
    </div>
  );
}
