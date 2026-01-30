import ProfileCard from "./components/ProfileCard";
import "./App.css";

const profiles = [
  {
    id: 1,
    name: "Zaheer",
    email: "zaheer@gmail.com",
    role: "Frontend Developer",
    age: 22,
    city: "Hyderabad",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Ashok",
    email: "ashok@gmail.com",
    role: "Backend Developer",
    age: 25,
    city: "Delhi",
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Faizan",
    email: "faizan@gmail.com",
    role: "UI Designer",
    age: 23,
    city: "Mumbai",
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "Damodhar",
    email: "damodhar@gmail.com",
    role: "Full Stack Developer",
    age: 26,
    city: "Bangalore",
    image: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    name: "Santhosh",
    email: "santhosh@gmail.com",
    role: "Product Manager",
    age: 28,
    city: "Pune",
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 6,
    name: "Mahesh",
    email: "mahesh@gmail.com",
    role: "DevOps Engineer",
    age: 27,
    city: "Chennai",
    image: "https://i.pravatar.cc/150?img=6"
  }
];

export default function App() {
  return (
    <div className="grid">
      <h1 className="title">ProfileCards</h1>
      {profiles.map(profile => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}






