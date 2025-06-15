// src/pages/Budgets.js
import React, { useState, useEffect } from "react";

export default function Budgets() {
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [budgets, setBudgets] = useState(() => {
    return JSON.parse(localStorage.getItem("budgets")) || [];
  });

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const addBudget = () => {
    if (category && budget) {
      setBudgets([...budgets, { category, budget: parseFloat(budget) }]);
      setBudget("");
      setCategory("");
    }
  };

  return (
    <div className="page">
      <h2>📊 Budgets</h2>
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget Amount" type="number" />
      <button onClick={addBudget}>Add Budget</button>
      <ul>
        {budgets.map((b, index) => (
          <li key={index}>{b.category}: ${b.budget}</li>
        ))}
      </ul>
    </div>
  );
}