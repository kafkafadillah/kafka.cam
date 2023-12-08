import React from "react";
import AuthLayout from "../../Auth/AuthLayout";
import Login from "../../pages/LoginPage";
import { Link } from "react-router-dom";

export default function LoginFragment() {
  return (
    <AuthLayout title="login">
      <Login />
      <p>
        Don't have an Account? <Link to="/register">Sign Up</Link>
      </p>
    </AuthLayout>
  );
}
