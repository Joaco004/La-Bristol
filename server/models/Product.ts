import { Schema, model } from 'mongoose';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

const productSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
  },
  { versionKey: false }
);

export const Product = model<IProduct>('Product', productSchema);
