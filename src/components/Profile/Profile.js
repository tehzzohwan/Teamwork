import React from "react";
import AuthService from "../../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.first_name}'s</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      <p>
        <strong>FirstName:</strong> {currentUser.first_name}
      </p>

      <p>
        <strong>LastName:</strong> {currentUser.last_name}
      </p>

      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>

      <p>
        <strong>Role:</strong> {currentUser.role}
      </p>
      
    </div>
  );
};

export default Profile;
