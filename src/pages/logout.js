// src/pages/Logout.js
import React, { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="page">
      <h2>You have been logged out successfully.</h2>
    </div>
  );
}