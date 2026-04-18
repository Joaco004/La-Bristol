import { Schema, model } from 'mongoose';

interface IAdmin {
  email: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export const Admin = model<IAdmin>('Admin', adminSchema);
