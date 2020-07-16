import React, { ReactElement } from "react";
import { Menu, Category } from "../../models/menu-model";
import { ItemCallback } from "../../shared/shared";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import "./MenuContainer.css";
import { LoggedUser } from "../../models/auth";

interface Props {
  menu: Menu[];
  loggedUser: LoggedUser | undefined;
  onDeleteItem: ItemCallback;
  onEditItem: ItemCallback;
  onBuyItem: ItemCallback;
}

export default function MenuContainer({
  menu,
  loggedUser,
  onDeleteItem,
  onEditItem,
  onBuyItem,
}: Props): ReactElement {
  const weeklySpecials = menu.filter((items) => {
    return items.category[0] === 0;
  });
  const appetizers = menu.filter((items) => {
    return items.category[0] === 1;
  });
  const mainDishes = menu.filter((items) => {
    return items.category[0] === 2;
  });
  const desserts = menu.filter((items) => {
    return items.category[0] === 3;
  });
  const beverages = menu.filter((items) => {
    return items.category[0] === 4;
  });

  return (
    <div className="menuContainer">
      <h1>Menu</h1>
      {loggedUser?.user.roles[0] === 1 || loggedUser?.user.roles[0] === 2 ? (
        <Link to="/addItem">Add Menu Item</Link>
      ) : null}
      <div>
        <div className="menu-category">Weekly Specials</div>
        <div className="menu-wrapper">
          {weeklySpecials.map((item) => (
            <MenuItem
              key={item._id}
              loggedUser={loggedUser}
              menu={item}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              onBuyItem={onBuyItem}
            />
          ))}
        </div>
        <div className="menu-category">Appetizers</div>
        <div className="menu-wrapper">
          {appetizers.map((item) => (
            <MenuItem
              key={item._id}
              loggedUser={loggedUser}
              menu={item}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              onBuyItem={onBuyItem}
            />
          ))}
        </div>
        <div className="menu-category">Main dishes</div>
        <div className="menu-wrapper">
          {mainDishes.map((item) => (
            <MenuItem
              key={item._id}
              loggedUser={loggedUser}
              menu={item}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              onBuyItem={onBuyItem}
            />
          ))}
        </div>
        <div className="menu-category">Desserts</div>
        <div className="menu-wrapper">
          {desserts.map((item) => (
            <MenuItem
              key={item._id}
              loggedUser={loggedUser}
              menu={item}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              onBuyItem={onBuyItem}
            />
          ))}
        </div>
        <div className="menu-category">Beverages</div>
        <div className="menu-wrapper">
          {beverages.map((item) => (
            <MenuItem
              key={item._id}
              loggedUser={loggedUser}
              menu={item}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              onBuyItem={onBuyItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
