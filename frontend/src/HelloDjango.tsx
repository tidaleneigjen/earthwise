import React, { useEffect, useState } from "react";

const HelloDjango: React.FC = () => {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error connecting to Django backend.");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Django says:</h2>
      <p>{message}</p>
    </div>
  );
};

export default HelloDjango;

