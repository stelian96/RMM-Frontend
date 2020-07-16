import { Menu } from "../models/menu-model";
import { MenuRepository } from "./repository";
import { IdType } from "../shared/shared";
export const MENU_API = "http://localhost:9000/";

class MenuService {
  private repo = new MenuRepository();
  constructor(private apiUrl: string) {}

  async getAllItems() {
    const resp = await fetch("http://localhost:9000/api/menu");
    const menu = await resp.json();
    return menu;
  }
  async getItemById(itemId: IdType) {
    const resp = await fetch(`http://localhost:9000/api/menu/${itemId}`);
    const menu = await resp.json();
    return menu;
  }

  async createNewItem(item: Menu) {
    const resp = await fetch("http://localhost:9000/api/menu", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const created = await resp.json();
    return created;
  }

  async updateItem(item: Menu) {
    const resp = await fetch(`http://localhost:9000/api/menu/${item._id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const updated = await resp.json();
    return updated;
  }

  async deleteItem(itemId: IdType) {
    const resp = await fetch(`http://localhost:9000/api/menu/${itemId}`, {
      method: "DELETE",
      mode: "cors",
    });
    const deleted = await resp.json();
    return deleted;
  }
}
export default new MenuService(MENU_API);
