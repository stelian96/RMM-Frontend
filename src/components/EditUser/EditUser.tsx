import React, { ReactElement, useState } from "react";
import { User, Role } from "../../models/user-model";
import { UserCallback } from "../../shared/shared";

interface Props {
  user: User;
  onSubmitUser: UserCallback;
}

export default function EditUser({ user, onSubmitUser }: Props): ReactElement {
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [fullname, setFullname] = useState(user?.fullName);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [roles, setRoles] = useState(user?.roles[0]+"");

  const handleRoles = () => {
    if (roles === "0") {
      return [Role.CUSTOMER];
    } else if (roles === "1") {
      return [Role.MANAGER];
    } else if (roles === "2") {
      return [Role.ADMIN];
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = new User(
      user?._id,
      fullname,
      username,
      email,
      user.password,
      phone,
      address,
      handleRoles()
    );
    onSubmitUser(result);
  };
  return (
    <div className="containerCenter bg-white">
      <p className="containerHeader">Edit User</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            disabled
          />
        </label>
        <label>
          Email:
          <input
            value={email}
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Full name:
          <input
            value={fullname}
            type="text"
            name="fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
        </label>
        <label>
          Phone:
          <input
            value={phone}
            type="text"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <div className="textArea">
        <label>
          Address:        </label>
          <textarea
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
</div>
        <div className="radio">
        <label>Roles:</label>
        <div className="radiobox">
          <label>
            <input name="role" type="radio" value="0" defaultChecked={user.roles[0] === 0} onClick={(e) => setRoles("0")} />
            Customer
          </label>
          <label>
            <input name="role" type="radio" value="1" defaultChecked={user.roles[0] === 1} onClick={(e) => setRoles("1")}/>
            Manager
          </label>
          <label>
            <input name="role" type="radio" value="2" defaultChecked={user.roles[0] === 2} onClick={(e) => setRoles("2")}/>
            Admin
          </label>
        </div>
        
        </div>
        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
