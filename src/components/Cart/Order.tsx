import React, { ReactElement } from "react";
import { Menu } from "../../models/menu-model";
import { ItemCallback } from "../../shared/shared";

interface Props {
  order: Menu;
  onDeleteOrder: ItemCallback;
}

export default function Order({ order, onDeleteOrder }: Props): ReactElement {
  const handleDeleteOrder = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onDeleteOrder(order);
  };
  return (
    <div className="orderItemContainer">
      <span onClick={handleDeleteOrder} className="material-icons">
        delete_forever
      </span>
      <p>{order.foodName}</p>
      <p>{order.price} $</p>
    </div>
  );
}
