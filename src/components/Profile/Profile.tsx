import React, { ReactElement, useState } from "react";
import { LoggedUser } from "../../models/auth";
import { User } from "../../models/user-model";
import { UserCallback } from "../../shared/shared";
import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";

interface Props {
  loggedUser: LoggedUser | undefined;
  onChangeUserInfo: UserCallback;
}

export default function Profile({
  loggedUser,
  onChangeUserInfo,
}: Props): ReactElement {
  const { register, handleSubmit, errors } = useForm<User>();

  const onSubmit = (data: User) => {
    if (loggedUser !== undefined) {
      data._id = loggedUser?.user._id;
      data.password = loggedUser?.user.password;
      data.roles = loggedUser?.user.roles;
      data.username = loggedUser?.user.username;
      onChangeUserInfo(data);
    }
  };
  return (
    <div className="containerCenter">
      <p className="containerHeader">Welcome {loggedUser?.user.fullName}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input
            value={loggedUser?.user.username}
            type="text"
            name="username"
            disabled
          />
        </label>
        <label>
          Email:
          <input
            defaultValue={loggedUser?.user.email}
            type="email"
            name="email"
            ref={register({ required: true })}
          />
          {errors.email && errors.email.type === "required" && (
            <div className="formError">Your must enter your Email.</div>
          )}
        </label>
        <label>
          Full name:
          <input
            defaultValue={loggedUser?.user.fullName}
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
            defaultValue={loggedUser?.user.phone}
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
            defaultValue={loggedUser?.user.address}
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
        {/* <small>
         To change password <Link to="/changePassword">Click here !</Link>
        </small> */}
        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
