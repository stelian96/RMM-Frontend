import React, { ReactElement } from 'react'
import { User } from '../../models/user-model';
import { UserCallback } from '../../shared/shared';

interface Props {
    user: User;
    onEditUser: UserCallback;
    onDeleteUser: UserCallback;
  }
  
  export default function UserLi({
    user,
    onDeleteUser,
    onEditUser,
  }: Props): ReactElement {
    const handleDelete = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      onDeleteUser(user);
    };
    const handleEdit = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      onEditUser(user);
    };
    return (
      <div className="divTableRow">
        <div className="divTableCell">{user.username}</div>
        <div className="divTableCell">{user.fullName}</div>
        <div className="divTableCell">{user.email}</div>
        <div className="divTableCell">{user.phone}</div>
        <div className="divTableCell">{user.address}</div>
        <div className="divTableCell">{user.roles}</div>
        <div className="divTableCell">
          <button className="btnEdit" onClick={handleEdit}>
            Edit
          </button>
          <button className="btnDelete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
  