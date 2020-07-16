import React, { ReactElement, Fragment, useState } from "react";
import { OrderInfo, Status } from "../../models/orderinfo-model";
import { OrderCallback } from "../../shared/shared";

interface Props {
  order: OrderInfo;
  onStatusChange: OrderCallback;
}

export default function OrderFragment({
  order,
  onStatusChange,
}: Props): ReactElement {
  const today = order.date + "";
  const year = today.slice(0, 10);
  const hours = today.slice(11, 13);
  const hoursPlusTimeZone = Number(hours.slice(0, 3)) + 3;
  const minutes = today.slice(13, 16);
  const handleStatus = () => {
    if (order.status[0] + "" === "0") {
      return "ACTIVE";
    } else if (order.status[0] + "" === "1") {
      return "DELIVERED";
    } else if (order.status[0] + "" === "2") {
      return "CANCELED";
    }
  };

  const handleDelivered = () => {
    const result = new OrderInfo(
      order._id,
      order.username,
      order.userFullname,
      order.address,
      order.phone,
      order.orderedItems,
      order.date,
      order.totalPrice,
      [Status.DELIVERED]
    );

    onStatusChange(result);
  };
  const handleCanceled = () => {
    const result = new OrderInfo(
      order._id,
      order.username,
      order.userFullname,
      order.address,
      order.phone,
      order.orderedItems,
      order.date,
      order.totalPrice,
      [Status.CANCELED]
    );

    onStatusChange(result);
  };

  return (
    <div>
      <div className="orderTable">
        <div className="divTableBody">
          <div className="divTableRow">
            <div className="divTableCell width-50">Customer Information</div>
            <div className="divTableCell width-50">Order Information</div>
          </div>
          <div className="divTableRow">
            <div className="divTableCell">
              {" "}
              <div className="displayFlex">
                <p>{year} </p>
                <p>
                  {hoursPlusTimeZone}
                  {minutes}
                </p>
              </div>
              <div className="displayFlex">
                <p>Username: </p>
                <p>{order.username}</p>
              </div>
              <div className="displayFlex">
                <p>Name: </p>
                <p>{order.userFullname}</p>
              </div>
              <div className="displayFlex">
                <p>Phone: </p>
                <p>{order.phone}</p>
              </div>
              <div className="displayFlex">
                <p>Address: </p>
                <p>{order.address}</p>
              </div>
              <div className="displayFlex finalSector">
                <p>Change Status:</p>
                {order.status[0] !== 1 ? (
                  <button className="btnEdit" onClick={handleDelivered}>Delivered</button>
                ) : null}
                {order.status[0] !== 2 ? (
                  <button className="btnDelete" onClick={handleCanceled}>Canceled</button>
                ) : null}
              </div>
            </div>
            <div className="divTableCell">
              <div className="displayFlex">
                <p>Status: </p>
                <p>{handleStatus()}</p>
              </div>

              {order.orderedItems.map((item) => (
                <div className="displayFlex">
                  <p>{item.foodName}</p>
                  <p className="itemPrice">{item.price}$</p>
                </div>
              ))}
              <div className="displayFlex finalSector">
                <p>Total Price: </p>
                <p>{order.totalPrice}$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
