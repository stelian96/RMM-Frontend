import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { Credentials } from "../../models/auth";
import { CredentialsCallback } from "../../shared/shared";
import { useForm } from "react-hook-form";

interface Props {
  SubmitLogin: CredentialsCallback;
}

export default function SignIn({ SubmitLogin }: Props): ReactElement {
  const { register, handleSubmit, errors } = useForm<Credentials>();
  const login = (data: Credentials) => {
    SubmitLogin(data);
  };
  return (
    <div className="containerCenter">
      <p className="containerHeader">Sign In</p>
      <form onSubmit={handleSubmit(login)}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            ref={register({ required: true })}
          />
          {errors.username && errors.username.type === "required" && (
            <div className="formError">Username is required.</div>
          )}
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && (
            <div className="formError">Password is required.</div>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <div className="formError">Password min lenght is 6.</div>
          )}
        </label>
        <small>
          Don't have an account ? <Link to="/register">Click to Register</Link>
        </small>

        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
