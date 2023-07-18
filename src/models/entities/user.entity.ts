import { Document } from 'mongoose';

/**
 * the role representation
 */
export class RoleEntity {
  roleName: string;
  manageUsers: boolean;
  watchReports: boolean;
  access: boolean;
  position: string;
}

/**
 * representation of user
 */
export class UserEntity extends Document {
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
