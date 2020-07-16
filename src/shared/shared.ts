import { User } from "../models/user-model";
import { Menu } from "../models/menu-model";
import { Credentials } from "../models/auth";
import { OrderInfo } from "../models/orderinfo-model";

export interface ItemCallback {
  (menu: Menu): void;
}
export interface OrderCallback {
  (order: OrderInfo): void;
}
export interface UserCallback {
  (user: User): void;
}
export interface CredentialsCallback {
  (credentials: Credentials): void;
}
export interface LogoutCallback {
  (string: string): void
}

export type IdType = string;

export interface Indentifiable {
  _id?: IdType;
}
