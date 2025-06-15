// src/pages/Reports.js
import React, { useEffect, useState } from "react";

export default function Reports() {
  const [summary, setSummary] = useState({ expenses: 0, budgets: 0 });

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const budgets = JSON.parse(localStorage.getItem("budgets")) || [];
    const expensesTotal = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const budgetTotal = budgets.reduce((acc, curr) => acc + curr.budget, 0);
    setSummary({ expenses: expensesTotal, budgets: budgetTotal });
  }, []);

  return (
    <div className="page">
      <h2>📋 Reports</h2>
      <p><strong>Total Expenses:</strong> ${summary.expenses}</p>
      <p><strong>Total Budgets:</strong> ${summary.budgets}</p>
    </div>
  );
}