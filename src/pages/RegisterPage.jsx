import React from "react";

export default function Register() {
  return (
    <div className="register">
      <form action="">
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" id="email" className="email" placeholder="Email" />
        <br />
        <label htmlFor="username">Username</label>
        <br />
        <input type="text" id="username" className="username" placeholder="Username" />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" id="password" className="password" placeholder="Password" />
        <br />
        <label htmlFor="confirm-password">Confirm Password</label>
        <br />
        <input type="password" id="confirm-password" className="confirm-password" placeholder="Confirm Password" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
