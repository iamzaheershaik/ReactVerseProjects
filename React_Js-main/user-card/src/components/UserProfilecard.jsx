import React, { Component } from "react";
import "../App.css";

class UserProfileCard extends Component {
  render() {
    const { 
      name, 
      email, 
      phone,
      designation, 
      address, 
      skills,
      profilePicture 
    } = this.props;

    return (
      <div className="profile-card">
        <img
          src={profilePicture}
          alt="Profile"
          className="profile-img"
        />

        <h2 className="profile-name">{name}</h2>
        <p className="profile-designation">{designation}</p>
        <p className="profile-email">📧 {email}</p>
        <p className="profile-phone">📞 {phone}</p>
        <p className="profile-address">📍{address}</p>
        <p className="profile-skills">🛠 Skills: {skills}</p>
      </div>
    );
  }
}

export default UserProfileCard;
