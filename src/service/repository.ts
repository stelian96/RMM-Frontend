import { Indentifiable, IdType } from "../shared/shared";
import { User } from "../models/user-model";


export interface Repository<T extends Indentifiable> {
    add(user: T): T;
    edit(user: T): T;
    deleteById(_id: IdType): T | undefined;
    findAll(): T[];
    findById(_id: IdType): T | undefined;
    getCount(): number;
}

export class MockRepository<T extends Indentifiable> implements Repository<T> {
    static nextId : number;
    private entities = new Map<IdType, T>();
    add(entity: T): T {
        entity._id = this.getNextId();
        this.entities.set(entity._id, entity);
        return entity;
    }
    edit(entity: T): T {
        if(!entity._id) {
            throw Error(`Entity ID can not be undefined.`)
        }
        const found = this.findById(entity._id);
        if(!found) {
            throw Error(`Entity ID="${entity._id} does not exist and can not be modified.`)
        }
        this.entities.set(entity._id, entity);
        return entity;
    }
    deleteById(_id: IdType): T | undefined {
        const found = this.findById(_id);
        this.entities.delete(_id);
        return found;
    }
    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    findById(_id: IdType): T | undefined {
        return this.entities.get(_id);
    }
   
    getCount(): number {
        return this.entities.size;
    }

    // Implementation details
    private getNextId(): IdType {
        if(!MockRepository.nextId) {
            MockRepository.nextId = 0;
        }
        return ++MockRepository.nextId + '';
    }
    
}

export class UserRepository extends MockRepository<User> {
}
export class MenuRepository extends MockRepository<User> {
}
export class OrderRepository extends MockRepository<User> {
}
