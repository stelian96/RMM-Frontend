import React, { ReactElement, useState } from "react";
import { User } from "../../models/user-model";
import { UserCallback } from "../../shared/shared";
import UserLi from "./UserLi";
import './UserManage.css'

interface Props {
  users: User[];
  onDeleteUser: UserCallback;
  onEditUser: UserCallback;
}

export default function UserManage({ users, ...rest }: Props): ReactElement {
    const [searchField, setSearchField] = useState("");
    const filteredArray = users.filter((users) => {
      return users.username.toLowerCase().includes(searchField.toLowerCase());
    });
  return (
      <div className="userManageContainer">
          <label className="searchLabel">
        Search by username:
        <input
          type="text"
          onChange={(e) => setSearchField(e.target.value)}
        />
      </label>
      <div className="table-wrapper">
    <div className="divTable">
      <div className="divTableHeading">
        <div className="divTableRow">
          <div className="divTableHead">Username</div>
          <div className="divTableHead">Full Name</div>
          <div className="divTableHead">Email</div>
          <div className="divTableHead">Phone</div>
          <div className="divTableHead">Address</div>
          <div className="divTableHead">Role</div>
          <div className="divTableHead">Manage</div>
        </div>
       
      </div>
      <div className="divTableBody">
        {filteredArray.map((user) => (
          <UserLi key={user._id} user={user} {...rest} />
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}
