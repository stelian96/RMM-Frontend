import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { UserCallback } from "../../shared/shared";
import { User, Role } from "../../models/user-model";
import { useForm } from "react-hook-form";

interface Props {
  onSubmitUser: UserCallback;
}

export default function Register({ onSubmitUser }: Props): ReactElement {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { register, handleSubmit, errors } = useForm<User>();
  const onSubmit = (data: User) => {
    const result = new User(
      "",
      fullname,
      username,
      email,
      password,
      phone,
      address,
      [Role.CUSTOMER]
    );
    onSubmitUser(result);
  };

  return (
    <div className="containerCenter bg-white">
      <p className="containerHeader">Register</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            ref={register({ required: true, minLength: 5, maxLength: 24 })}
          />
          {errors.username && errors.username.type === "required" && (
            <div className="formError">Username with 5 to 24 characters is required.</div>
          )}
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            ref={register({ required: true, minLength:6 })}
          />
          {errors.password && errors.password.type === "required" && (
            <div className="formError">Password with 6 characters is required.</div>
          )}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.email && errors.email.type === "required" && (
            <div className="formError">Your must enter your Email.</div>
          )}
        </label>
        <label>
          Full name:
          <input
            type="text"
            name="fullName"
            onChange={(e) => setFullname(e.target.value)}
            ref={register({ required: true, minLength: 4, maxLength:24 })}
          />
          {errors.fullName && errors.fullName.type === "required" && (
            <div className="formError">Name with 4-24 characters is required.</div>
          )}
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            ref={register({ required: true, minLength:10, maxLength:14 })}
          />
          {errors.phone && errors.phone.type === "required" && (
            <div className="formError">Please enter valid number.</div>
          )}
        </label>
        <div className="textArea">
          <label>Address: </label>
          <textarea
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            ref={register({ required: true })}
          />
        </div>
        {errors.address && errors.address.type === "required" && (
          <div className="formError">Your must enter Address for delivery.</div>
        )}
        <small>
          Already have an account ? <Link to="/login">Click to Sign In</Link>
        </small>

        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
