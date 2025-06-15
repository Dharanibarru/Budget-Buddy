// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Dashboard.css";

const COLORS = [
  "#00C49F", "#FF8042", "#0088FE", "#FFBB28",
  "#FF6384", "#36A2EB", "#9966FF", "#FFCE56"
];

export default function Dashboard() {
  const [expensesData, setExpensesData] = useState([]);
  const [goalData, setGoalData] = useState([]);

  // Load expense data once on mount
  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const expenses = {};
    transactions.forEach((txn) => {
      expenses[txn.description] = (expenses[txn.description] || 0) + txn.amount;
    });
    const formattedExpenses = Object.keys(expenses).map((key) => ({
      name: key,
      value: expenses[key],
    }));
    setExpensesData(formattedExpenses);
  }, []);

  // Poll goal data every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const goals = JSON.parse(localStorage.getItem("goals")) || [];
      const total = goals.length;
      const completed = goals.filter((g) => g.completed).length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      setGoalData([
        { name: "Completed", value: percent },
        { name: "Remaining", value: 100 - percent },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page dashboard-page">
      <h2>📈 Dashboard</h2>
      <div className="charts">
        <div className="chart-box">
          <h4>Expenses by Category</h4>
          <PieChart width={300} height={300}>
            <Pie
              data={expensesData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {expensesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="chart-box">
          <h4>Goal Progress</h4>
          <PieChart width={300} height={300}>
            <Pie
              data={goalData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              label
            >
              {goalData.map((entry, index) => (
                <Cell key={`cell-goal-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
