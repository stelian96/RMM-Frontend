import { User } from "../models/user-model";

export interface Credentials {
    username: string;
    password: string;
}

export interface LoggedUser {
    user: User, 
    token: string
}