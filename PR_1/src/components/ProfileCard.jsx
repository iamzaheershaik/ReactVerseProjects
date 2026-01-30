export default function ProfileCard({ profile }) {
  const { name, email, role, age, city, image } = profile;

  return (
    <div className="card">
      <img src={image} alt={name} className="avatar" />
      <h2>{name}</h2>
      <p>{role}</p>

      <div className="info">
        <p>📧 {email}</p>
        <p>🎂 {age}</p>
        <p>📍 {city}</p>
      </div>
    </div>
  );
}





