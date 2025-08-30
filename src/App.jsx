import React, { useState } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("bmiEntries");
    return saved ? JSON.parse(saved) : [];
  });


  const masterPassword = "mypassword123"; // change this

  // Conversion functions
  const feetInchesToCm = (feet, inches) => (Number(feet) * 12 + Number(inches)) * 2.54;
  const lbsToKg = (lbs) => Number(lbs) * 0.453592;
  const getBmiColor = (bmi) => {
    const value = Number(bmi);
    if (value < 18.5) return "#6FA8DD";
    if (value >= 18.5 && value <= 24.9) return "#B6D7A8";
    if (value >= 25 && value <= 29.9) return "#FFE598";
    if (value >= 30 && value <= 34.9) return "#F6B26B";
    if (value >= 35 && value <= 39.9) return "#DE6665";
    if (value >= 40) return "#CF5138";
    return "black";
  };

  const calculateBMI = () => {
    if (!heightFeet || !heightInches || !weightLb) return;
    const heightCm = feetInchesToCm(heightFeet, heightInches);
    const weightKg = lbsToKg(weightLb);
    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(2);

    const newEntry = {
      name,
      age,
      heightFeet,
      heightInches,
      heightCm: heightCm.toFixed(1),
      weightLb,
      weightKg: weightKg.toFixed(1),
      bmi,
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("bmiEntries", JSON.stringify(updatedEntries));

    // Clear input fields
    setName("");
    setAge("");
    setHeightFeet("");
    setHeightInches("");
    setWeightLb("");
  };


  // Login screen
  if (!loggedIn) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#D2B48C" ,
          boxSizing: "border-box",
          width: "100vw",  // full width of viewport
        }}
      >

        <h1>Enter Password to Access BMI Logger</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", margin: "10px", fontSize: "20px" }}
        />
        <button
          onClick={() => {
            if (password === masterPassword) setLoggedIn(true);
            else {
              alert("The password is: " + masterPassword);
              setPassword("");
            }
          }}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Login
        </button>
      </div>
    );
  }

  // BMI Logger screen
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f4f4f4",
      }}
    >
      <h1>Private BMI Logger</h1>

      <div style={{ margin: "20px 0", width: "90%", textAlign: "center" }}>
        <img
          src="https://marathonhandbook.com/wp-content/uploads/BMI-Chart-Printable-Metric-1.png"
          alt="BMI Chart"
          style={{ width: "100%", height: "auto" }} // full width of container
        />
      </div>


      <div
        style={{
          display: "flex",
          flexWrap: "wrap",          // wraps on smaller screens
          justifyContent: "center",   // center horizontally
          alignItems: "center",       // center vertically
          gap: "10px",
          margin: "20px 0",
          width: "100%",              // stretch full width
          maxWidth: "900px",          // optional max width
        }}
      >


        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", minWidth: "150px" }}
        />
        <input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", minWidth: "80px" }}
        />
        <input
          placeholder="Height (ft)"
          value={heightFeet}
          onChange={(e) => setHeightFeet(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", width: "80px" }}
        />
        <input
          placeholder="Height (in)"
          value={heightInches}
          onChange={(e) => setHeightInches(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", width: "80px" }}
        />
        <input
          placeholder="Weight (lb)"
          value={weightLb}
          onChange={(e) => setWeightLb(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", minWidth: "100px" }}
        />
        <button
          onClick={calculateBMI}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Add Entry
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, width: "90%" }}>
        {entries.map((e, idx) => (
          <li
            key={idx}
            style={{
              backgroundColor: getBmiColor(e.bmi),
              padding: "10px",
              margin: "5px 0",
              borderRadius: "8px",
              color: "#000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {e.name}, Age: {e.age}, Height: {e.heightFeet}'{e.heightInches}" ({e.heightCm} cm),
              Weight: {e.weightLb} lb ({e.weightKg} kg)
            </span>
            <span
              style={{
                fontWeight: "bold",
                padding: "5px 10px",
                borderRadius: "5px",
                backgroundColor: "#fff",
              }}
            >
              BMI: {e.bmi}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
