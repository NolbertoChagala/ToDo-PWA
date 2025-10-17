import React from "react";
import logo from "../assets/react.svg";
import "../style/SplashMessage.css";

export default function SplashMessage() {
  return (
    <div className="splash-root">
      <div className="splash-card">
        <img src={logo} className="splash-logo" alt="logo" />
        <h1 className="splash-title">To-Do</h1>
        <p className="splash-sub">Organiza tu día</p>
      </div>
    </div>
  );
}
