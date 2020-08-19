import React from "react";
import logo from "../assets/Logo/Logo-brainflix.svg";
import faceImage from "../assets/Images/face.png";
import { Link } from "react-router-dom";

export default function header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="BrainFlix-logo" />
        </Link>
      </div>
      <form className="header__form">
        <input
          className="header__search"
          type="text"
          placeholder="Search"
        ></input>
        <div className="header__bimg">
          <Link to="/upload" className="header__upload-link">
            <button className="header__bimg-button"> + UPLOAD</button>
          </Link>
          <div className="header__bimg-img">
            <img src={faceImage} alt="user-face" />
          </div>
        </div>
      </form>
    </header>
  );
}
