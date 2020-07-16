import React, { ReactElement, useState, Fragment } from "react";
import "./Nav.css";
import { NavLink, Link } from "react-router-dom";
import { LoggedUser } from "../../models/auth";
import { Role } from "../../models/user-model";
import { LogoutCallback } from "../../shared/shared";

interface Props {
  loggedUser: LoggedUser | undefined;
  onSignOut: LogoutCallback;
}

export default function Nav({ loggedUser, onSignOut }: Props): ReactElement {
  const [sideBar, setSideBar] = useState("nav-links");
  const [burgerToggle, setBurgerToggle] = useState("");
  const sideBarToggle = () => {
    if (sideBar === "nav-links") {
      setSideBar("nav-links nav-active");
      setBurgerToggle("toggle");
    } else {
      setSideBar("nav-links");
      setBurgerToggle("");
    }
  };

  const handleSignOut = () => {
    onSignOut("signOut");
  };
  return (
    <nav>
      <div>
        {" "}
        <h4 className="logo">The Logo</h4>
      </div>
      <ul className={sideBar}>
        <li>
          <NavLink exact to="/" activeClassName="selected">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" activeClassName="selected">
            Menu
          </NavLink>
        </li>
        {loggedUser === undefined ? (
          <Fragment>
            <li>
              <NavLink to="/login" activeClassName="selected">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" activeClassName="selected">
                Register
              </NavLink>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <NavLink to="/profile" activeClassName="selected">
                <span className="material-icons">account_box</span>
                Profile
              </NavLink>
            </li>
            <li>
              <Link to="/login" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
            <li>
              <NavLink to="/cart" activeClassName="selected">
                <span className="material-icons">shopping_cart</span>
                Cart
              </NavLink>
            </li>
          </Fragment>
        )}
        {loggedUser?.user.roles[0] === 2 ? (
          <li>
            <NavLink to="/usermanage" activeClassName="selected">
              User Management
            </NavLink>
          </li>
        ) : null}
        {loggedUser?.user.roles[0] === 1 || loggedUser?.user.roles[0] === 2 ? (
          <li>
            <NavLink to="/orders" activeClassName="selected">
              Orders
            </NavLink>
          </li>
        ) : null}
      </ul>
      <div className={`burger ${burgerToggle}`} onClick={sideBarToggle}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
