import React, { useState, useEffect } from "react";
import "./Goals.css";

export default function Goals() {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  // Normalize old goal format on first load
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const normalizedGoals = storedGoals.map((g) =>
      typeof g === "string" ? { text: g, completed: false } : g
    );
    setGoals(normalizedGoals);
  }, []);

  // Keep localStorage in sync with goals
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (goal.trim()) {
      setGoals([...goals, { text: goal, completed: false }]);
      setGoal("");
    }
  };

  const toggleGoal = (index) => {
    const updatedGoals = goals.map((g, i) =>
      i === index ? { ...g, completed: !g.completed } : g
    );
    setGoals(updatedGoals);
  };

  return (
    <div className="page goals-page">
      <h2>🎯 Financial Goals</h2>
      <div className="goal-input">
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="New Financial Goal"
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>
      <ul className="goal-list">
        {goals.map((g, index) => (
          <li key={index} className={g.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={g.completed}
                onChange={() => toggleGoal(index)}
              />
              {g.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
