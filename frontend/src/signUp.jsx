import React, { useState } from "react";
import "./signUp.css";

const SignUp = ({ onSignUp }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;
    if (name && email && password) {
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await response.json();
        if (data.message === "User registered successfully") {
          alert("Signup successful! Please login.");
          onSignUp();
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Signup failed. Try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Lyrics Finder</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
