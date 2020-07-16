import { User } from "../models/user-model";
import { UserRepository } from "./repository";
import { IdType } from "../shared/shared";
export const USERS_API = 'http://localhost:9000/';

 class UserService {
    private repo = new UserRepository();
    constructor(private apiUrl: string) {
        
    }

    async getAllUsers() {
        const resp = await fetch('http://localhost:9000/api/users');
        const users = await resp.json();
        return users;
    }
    async getUserById(userId: IdType) {
        const resp = await fetch(`http://localhost:9000/api/user/${userId}`);
        const post = await resp.json();
        return post;
    }

    async createNewUser(user: User) {
        const resp = await fetch('http://localhost:9000/api/users', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });
        const created = await resp.json();
        
        return created;
    }

    async updateUser(user: User, authToken: string) {
        const resp = await fetch(`http://localhost:9000/api/users/${user._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken || ''}`
        },
            body: JSON.stringify(user),
        });
        const updated = await resp.json();
        return updated;
    }

    async deleteUser(userId: IdType, authToken: string ) {
        const resp = await fetch(`http://localhost:9000/api/users/${userId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken || ''}`
        }
        });
        const deleted = await resp.json();
        return deleted;
    }
}
export default new UserService(USERS_API);