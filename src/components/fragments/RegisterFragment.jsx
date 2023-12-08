import React from "react";
import AuthLayout from "../../Auth/AuthLayout";
import Register from "../../pages/RegisterPage";
import { Link } from "react-router-dom";

export default function RegisterFragment() {
  return (
    <AuthLayout title="Register">
      <Register />
      <p>
        Already have an Account ? <Link to="/login">Sign In</Link>
      </p>
    </AuthLayout>
  );
}
