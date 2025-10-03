import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.role) return alert("Please select a role");

    try {
      const res = await axios.post("http://localhost:5800/api/auth/login", form);

      // Save token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role.toLowerCase());

      // Navigate based on role
      const role = res.data.user.role.toLowerCase();
      if (role === "organizer") navigate("/organizer/dashboard");
      else if (role === "attendee") navigate("/attendee/agenda");
      else if (role === "vendor") navigate("/vendor/dashboard");
      else if (role === "sponsor") navigate("/sponsor/insights");
      else navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select name="role" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="organizer">Organizer</option>
          <option value="attendee">Attendee</option>
          <option value="vendor">Vendor</option>
          <option value="sponsor">Sponsor</option>
        </select>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
