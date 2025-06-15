// src/pages/Transactions.js
import React, { useState, useEffect } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (description && amount) {
      setTransactions([...transactions, { description, amount: parseFloat(amount) }]);
      setDescription("");
      setAmount("");
    }
  };

  return (
    <div className="page">
      <h2>💵 Transactions</h2>
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" />
      <button onClick={addTransaction}>Add</button>
      <ul>
        {transactions.map((txn, index) => (
          <li key={index}>{txn.description} - ${txn.amount}</li>
        ))}
      </ul>
    </div>
  );
}