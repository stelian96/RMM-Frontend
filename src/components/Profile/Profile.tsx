import React, { ReactElement, useState } from "react";
import { LoggedUser } from "../../models/auth";
import { User } from "../../models/user-model";
import { UserCallback } from "../../shared/shared";
// import { Link } from "react-router-dom";


interface Props {
  loggedUser: LoggedUser | undefined;
  onChangeUserInfo: UserCallback;
}

export default function Profile({ loggedUser, onChangeUserInfo }: Props): ReactElement {
  const [username, setUsername] = useState(loggedUser?.user.username);
  const [email, setEmail] = useState(loggedUser?.user.email);
  const [fullname, setFullname] = useState(loggedUser?.user.fullName);
  const [phone, setPhone] = useState(loggedUser?.user.phone);
  const [address, setAddress] = useState(loggedUser?.user.address);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      loggedUser !== undefined &&
      fullname !== undefined &&
      username !== undefined &&
      email !== undefined &&
      phone !== undefined &&
      address !== undefined
    ) {
      const result = new User(
        loggedUser?.user._id,
        fullname,
        username,
        email,
        loggedUser?.user.password,
        phone,
        address,
        loggedUser?.user.roles
      );
      onChangeUserInfo(result);
    }
  };
  return (
    <div className="containerCenter bg-white">
      <p className="containerHeader">Welcome {loggedUser?.user.fullName}</p>
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
          <label>Address: </label>
          <textarea
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {/* <small>
         To change password <Link to="/changePassword">Click here !</Link>
        </small> */}
        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
