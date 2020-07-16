import React, { ReactElement, useState } from "react";
import { User, Role } from "../../models/user-model";
import { UserCallback } from "../../shared/shared";
import { useForm } from "react-hook-form";

interface Props {
  user: User;
  onSubmitUser: UserCallback;
}

export default function EditUser({ user, onSubmitUser }: Props): ReactElement {
  const [roles, setRoles] = useState(user?.roles[0] + "");

  const handleRoles = () => {
    if (roles === "0") {
      return [Role.CUSTOMER];
    } else if (roles === "1") {
      return [Role.MANAGER];
    } else if (roles === "2") {
      return [Role.ADMIN];
    } else {
      return [Role.CUSTOMER];
    }
  };
  const { register, handleSubmit, errors } = useForm<User>();
  const onSubmit = (data: User) => {
    data._id = user._id;
    data.username = user.username;
    data.password = user.password;
    data.roles = handleRoles();
    onSubmitUser(data);
  };
  return (
    <div className="containerCenter">
      <p className="containerHeader">Edit User</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input value={user.username} type="text" name="username" disabled />
        </label>
        <label>
          Email:
          <input
            defaultValue={user.email}
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
            defaultValue={user.fullName}
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
            defaultValue={user.phone}
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
            defaultValue={user.address}
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
        <div className="radio">
          <label>Roles:</label>
          <div className="radiobox">
            <label>
              <input
                name="roles"
                type="radio"
                value="0"
                defaultChecked={user.roles[0] === 0}
                onClick={(e) => setRoles("0")}
              />
              Customer
            </label>
            <label>
              <input
                name="roles"
                type="radio"
                value="1"
                defaultChecked={user.roles[0] === 1}
                onClick={(e) => setRoles("1")}
              />
              Manager
            </label>
            <label>
              <input
                name="roles"
                type="radio"
                value="2"
                defaultChecked={user.roles[0] === 2}
                onClick={(e) => setRoles("2")}
              />
              Admin
            </label>
          </div>
        </div>
        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
