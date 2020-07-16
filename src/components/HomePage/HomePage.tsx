import React, { ReactElement } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

interface Props {}

export default function HomePage({}: Props): ReactElement {
  return (
    <div className="homeContainer">
      <p>123 Fake Street — Sofia — 087-654-3210</p>
      <div>
        <Link to="/menu">Menu</Link>
        <a href="/">Book Table</a>
      </div>
    </div>
  );
}
