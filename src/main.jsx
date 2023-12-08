import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/RegisterPage.jsx";
import Login from "./pages/LoginPage.jsx";
import RegisterFragment from "./components/fragments/RegisterFragment.jsx";
import LoginFragment from "./components/fragments/LoginFragment.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterFragment />,
  },
  {
    path: "/login",
    element: <LoginFragment />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
