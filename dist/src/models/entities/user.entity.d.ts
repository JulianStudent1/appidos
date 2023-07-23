import { Document } from 'mongoose';
export declare class RoleEntity {
    roleName: string;
    manageUsers: boolean;
    watchReports: boolean;
    access: boolean;
    position: string;
}
export declare class UserEntity extends Document {
    _id: string;
    email: string;
    password: string;
    document: string;
    typeDocument: string;
    name: string;
    lastname: string;
    role: RoleEntity;
    bornDate: Date;
}
