import React from "react";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <h1>KAFKA.</h1>
      </div>
      <div className="extra">
        <div className="header-login-btn">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}
