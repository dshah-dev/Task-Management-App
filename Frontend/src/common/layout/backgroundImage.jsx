import React from "react";
import sideImage from "../../assets/LoginFrame.png";
import "./background.css";

function AuthSideImage() {
  return (
    <div className="auth-image-side">
      <img 
        src={sideImage} 
        alt="TaskFlow Hero" 
      />
    </div>
  );
}

export default AuthSideImage;