import React, { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import "./App.css";

export default function App() {

  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Zaheer",
      email: "z@gmail.com",
      role: "Frontend Developer",
      age: 22,
      city: "Hyderabad",
      image: "https://i.pravatar.cc/150?img=1"
    }
  ]);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const newProfile = {
      id: profiles.length + 1,
      name: name,
      email: email,
      role: role,
      age: age,
      city: city,
      image: image === "" ? "https://i.pravatar.cc/150" : image
    };

    setProfiles([...profiles, newProfile]);
    setName("");
    setEmail("");
    setRole("");
    setAge("");
    setCity("");
    setImage("");
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add New Profile</h2>

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
        <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />

        <button type="submit">Create Card</button>
      </form>

      <div className="grid">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </>
  );
}






