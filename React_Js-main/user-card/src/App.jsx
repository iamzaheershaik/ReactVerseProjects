import { useState } from 'react'
import UserProfileCard from "./components/UserProfilecard.jsx";
import "./App.css";

function App() {
    const [count, setCount] = useState(0)
  return (
    <div className="card-container">
      <UserProfileCard
        name="Aarohi Mehta"
        designation="Frontend Developer"
        email="aarohi@gmail.com"
        phone="9123456780"
        address="Ahmedabad, Gujarat"
        skills="HTML, CSS, Bootstrap, JavaScript, React"
        profilePicture="https://cdn-icons-png.flaticon.com/512/4140/4140045.png"
      />

      <UserProfileCard
        name="Rahul Sharma"
        designation="Backend Developer"
        email="rahul@gmail.com"
        phone="9876543210"
        address="Mumbai, Maharashtra"
        skills="Node.js, Express, MongoDB"
        profilePicture="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
      />

      <UserProfileCard
        name="Priya Patel"
        designation="UI/UX Designer"
        email="priya@gmail.com"
        phone="9012345678"
        address="Surat, Gujarat"
        skills="Figma, Adobe XD, Photoshop"
        profilePicture="https://cdn-icons-png.flaticon.com/512/4140/4140040.png"
      />

      <UserProfileCard
        name="Karan Verma"
        designation="Full Stack Developer"
        email="karan@gmail.com"
        phone="9988776655"
        address="Delhi, India"
        skills="React, Node.js, MongoDB"
        profilePicture="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
      />
    </div>
  );
}

export default App;
