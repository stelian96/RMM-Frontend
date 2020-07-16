import React, { ReactElement, Fragment } from "react";
import { ItemCallback } from "../../shared/shared";
import { Menu } from "../../models/menu-model";
import { LoggedUser } from "../../models/auth";

interface Props {
  loggedUser: LoggedUser | undefined;
  menu: Menu;
  onEditItem: ItemCallback;
  onDeleteItem: ItemCallback;
  onBuyItem: ItemCallback;
}

export default function MenuItem({
  menu,
  loggedUser,
  onEditItem,
  onDeleteItem,
  onBuyItem,
}: Props): ReactElement {
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onDeleteItem(menu);
  };
  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onEditItem(menu);
  };
  const handleBuyItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onBuyItem(menu);
  };
  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img src={`${menu.imageUrl}`} />
      </div>
      <div className="contentItem">
        <h4 className="foodname">{menu.foodName}</h4>
        <p className="description">{menu.description}</p>
        <div className="allergens">
          {menu.allergens.length > 0?<p>Allergens: {menu.allergens}</p>:<div className="spacer"></div>}
          
          
          <p> {menu.quantity}</p>
        </div>
        <div className="orderSection">
          <div>
            <p>{menu.price} $</p>
          </div>
          <button className="btnEdit" onClick={handleBuyItem}>
            Buy
          </button>
          {loggedUser?.user.roles[0] === 1 ||
          loggedUser?.user.roles[0] === 2 ? (
            <Fragment>
              <button className="btnEdit" onClick={handleEdit}>
                Edit
              </button>
              <button className="btnDelete" onClick={handleDelete}>
                Delete
              </button>
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
}
