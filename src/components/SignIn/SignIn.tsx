import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { Credentials } from "../../models/auth";
import { CredentialsCallback } from "../../shared/shared";

interface Props {
  SubmitLogin: CredentialsCallback;
}

export default function SignIn({ SubmitLogin }: Props): ReactElement {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result: Credentials = { username, password };
    SubmitLogin(result);
  };
  return (
    <div className="containerCenter bg-white">
      <p className="containerHeader">Sign In</p>
      <form onSubmit={login}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <small>
          Don't have an account ? <Link to="/register">Click to Register</Link>
        </small>

        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
