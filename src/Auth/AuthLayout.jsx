import React from "react";

export default function AuthLayout({ title, children }) {
  return (
    <div className="authlayout">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <p>Welcome!, please enter your detail</p>
      {children}
    </div>
  );
}
