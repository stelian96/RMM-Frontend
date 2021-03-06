import React, { ReactElement, useState, Fragment } from "react";
import { LoggedUser } from "../../models/auth";
import { Menu } from "../../models/menu-model";
import Order from "./Order";
import "./Cart.css";
import { ItemCallback, OrderCallback } from "../../shared/shared";
import { OrderInfo, Status } from "../../models/orderinfo-model";

interface Props {
  loggedUser: LoggedUser | undefined;
  orderList: Menu[];
  totalPrice: string;
  onDeleteOrder: ItemCallback;
  onSubmitOrder: OrderCallback;
}

export default function Cart({
  loggedUser,
  orderList,
  totalPrice,
  onDeleteOrder,
  onSubmitOrder,
}: Props): ReactElement {
  const [address, setAddress] = useState(
    loggedUser !== undefined ? loggedUser?.user.address : ""
  );

  const handleSubmitOrder = () => {
    if (loggedUser !== undefined && address !== undefined) {
      const result = new OrderInfo(
        "",
        loggedUser?.user.username,
        loggedUser?.user.fullName,
        address,
        loggedUser?.user.phone,
        orderList,
        new Date(),
        totalPrice,
        [Status.ACTIVE]
      );
      onSubmitOrder(result);
    }
  };

  return (
    <div className="containerCenter width-600">
      <p className="containerHeader">Your Shopping Cart</p>
      {orderList.length === 0 ? (
        <p>It is Empty :( </p>
      ) : (
        <Fragment>
          {orderList.map((order, index) => (
            <Order order={order} key={index} onDeleteOrder={onDeleteOrder} />
          ))}
          <div className="address cart">
            <label>Address for delivery: </label>
            <textarea
              value={address}
              name="address"
              onChange={(e) => setAddress(e.target.value)}
            />
            {address.length === 0 ? (
              <div className="formError">Address for delivery is required.</div>
            ) : null}
            <br />
          </div>
          <div className="confirmOrder">
            <p className="title">Total Price: {totalPrice} $</p>
            <button className="btnEdit" onClick={handleSubmitOrder}>
              Confirm Order
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
}
