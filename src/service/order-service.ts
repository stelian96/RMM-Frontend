import { OrderInfo } from "../models/orderinfo-model";
import { OrderRepository } from "./repository";
import { IdType } from "../shared/shared";
export const ORDER_API = "http://localhost:9000/";

class OrderService {
  private repo = new OrderRepository();
  constructor(private apiUrl: string) {}

  async getAllOrders() {
    const resp = await fetch("http://localhost:9000/api/orders");
    const order = await resp.json();
    return order;
  }
  async getOrderById(orderId: IdType) {
    const resp = await fetch(`http://localhost:9000/api/orders/${orderId}`);
    const order = await resp.json();
    return order;
  }

  async createNewOrder(order: OrderInfo) {
    const resp = await fetch("http://localhost:9000/api/orders", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const created = await resp.json();
    return created;
  }

  async updateOrder(order: OrderInfo) {
    const resp = await fetch(`http://localhost:9000/api/orders/${order._id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const updated = await resp.json();
    return updated;
  }

  async deleteOrder(orderId: IdType) {
    const resp = await fetch(`http://localhost:9000/api/orders/${orderId}`, {
      method: "DELETE",
      mode: "cors",
    });
    const deleted = await resp.json();
    return deleted;
  }
}
export default new OrderService(ORDER_API);
