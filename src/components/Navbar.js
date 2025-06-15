// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <h1>Budget Buddy</h1>
      <div className="nav-buttons">
        <button onClick={() => navigate("/logout")}>Logout</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/transactions")}>Transactions</button>
        <button onClick={() => navigate("/budgets")}>Budgets</button>
        <button onClick={() => navigate("/reports")}>Reports</button>
        <button onClick={() => navigate("/goals")}>Goals</button>
      </div>
    </header>
  );
}