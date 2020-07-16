import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { UserCallback } from "../../shared/shared";
import { User, Role } from "../../models/user-model";
import { useForm } from "react-hook-form";

interface Props {
  onSubmitUser: UserCallback;
}

export default function Register({ onSubmitUser }: Props): ReactElement {
  const { register, handleSubmit, errors } = useForm<User>();

  const onSubmit = (data: User) => {
    console.log(data);
    data._id = "";
    data.roles = [Role.CUSTOMER];
    onSubmitUser(data);
  };

  return (
    <div className="containerCenter">
      <p className="containerHeader">Register</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            ref={register({ required: true, minLength: 5, maxLength: 24 })}
          />
          {errors.username && errors.username.type === "required" && (
            <div className="formError">Username is required.</div>
          )}
          {errors.username && errors.username.type === "minLength" && (
            <div className="formError">Username min lenght is 5.</div>
          )}
          {errors.username && errors.username.type === "maxLength" && (
            <div className="formError">Username max lenght is 24.</div>
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
        <label>
          Email:
          <input type="email" name="email" ref={register({ required: true })} />
          {errors.email && errors.email.type === "required" && (
            <div className="formError">Your must enter your Email.</div>
          )}
        </label>
        <label>
          Full name:
          <input
            type="text"
            name="fullName"
            ref={register({ required: true, minLength: 4, maxLength: 24 })}
          />
          {errors.fullName && errors.fullName.type === "required" && (
            <div className="formError">Name is required.</div>
          )}
          {errors.fullName && errors.fullName.type === "minLength" && (
            <div className="formError">Name min length is 4.</div>
          )}
          {errors.fullName && errors.fullName.type === "maxLength" && (
            <div className="formError">Name max lenght is 24.</div>
          )}
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            ref={register({ required: true, minLength: 10, maxLength: 14 })}
          />
          {errors.phone && errors.phone.type === "required" && (
            <div className="formError">Please enter valid number.</div>
          )}
          {errors.phone && errors.phone.type === "maxLength" && (
            <div className="formError">Number is not valid: min lenght 10.</div>
          )}
          {errors.phone && errors.phone.type === "maxLength" && (
            <div className="formError">Number is not valid: max lenght 10 </div>
          )}
        </label>
        <div className="textArea">
          <label>Address: </label>
          <textarea
            name="address"
            ref={register({ required: true, minLength: 6, maxLength: 95 })}
          />
        </div>
        {errors.address && errors.address.type === "required" && (
          <div className="formError">Your must enter Address for delivery.</div>
        )}
        {errors.address && errors.address.type === "maxLength" && (
          <div className="formError">Should be less than 95 characters.</div>
        )}
        {errors.address && errors.address.type === "minLength" && (
          <div className="formError">Should be more than 6 characters.</div>
        )}
        <small>
          Already have an account ? <Link to="/login">Click to Sign In</Link>
        </small>

        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
