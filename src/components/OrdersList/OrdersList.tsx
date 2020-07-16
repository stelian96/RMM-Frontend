import React, { ReactElement, useState, useEffect, Fragment } from "react";
import { OrderInfo } from "../../models/orderinfo-model";
import OrderFragment from "./OrderFragment";
import "./OrderList.css"
import { OrderCallback } from "../../shared/shared";

interface Props {
  orders: OrderInfo[];
  onStatusChange: OrderCallback;
}

export default function OrdersList({ orders, ...rest  }: Props): ReactElement {
  console.log(orders);

  return (
    <div className="containerCenter bg-white ordersPadding">
      {orders.map((order) => (
        <OrderFragment order={order} key={order._id} {...rest} />
      ))}
    </div>
  );
}
