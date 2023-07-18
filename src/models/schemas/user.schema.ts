import { Schema } from 'mongoose';

/**
 * schema for roles
 */
export const RoleSchema = new Schema({
  roleName: String,
  manageUsers: Boolean,
  watchReports: Boolean,
  access: Boolean,
  position: String,
});

/**
 * database representation of the user object
 */
export const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  document: { type: String, required: true, unique: true },
  typeDocument: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  role: {
    type: RoleSchema,
    required: true,
  },
  bornDate: { type: Date, required: true },
});

/**
 * reference to user
 */
export const UserReferenceSchema = new Schema({
  id: String,
  name: String,
});
