
export default function ProfileCard({ profile }) {
  const { name, email, role, age, city, image } = profile;

  return (
    <div className="card">
      <img src={image} alt={name} className="avatar" />
      <h2 className="name">{name}</h2>
      <p className="role">{role}</p>

      <div className="info">
        <span>📧 {email}</span>
        <span>🎂 {age}</span>
        <span>📍 {city}</span>
      </div>
    </div>
  );
}




