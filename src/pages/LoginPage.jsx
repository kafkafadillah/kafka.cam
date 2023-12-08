import React from "react";

export default function Login() {
  return (
    <div className="login">
      <form action="">
        <label htmlFor="username">Username : </label>
        <br />
        <input type="text" id="username" className="username" />
        <br />
        <label htmlFor="password">Password : </label>
        <br />
        <input type="password" id="password" className="password" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
