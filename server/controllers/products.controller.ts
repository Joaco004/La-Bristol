import { Request, Response } from 'express';
import { Product } from '../models/Product.js';
import { uploadToCloudinary, destroyFromCloudinary } from '../config/cloudinary.js';

const toSlug = (str: string): string =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().select('-_id').lean();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findOne({ id: req.params.id }).select('-_id').lean();
    if (!product) { res.status(404).json({ error: 'Product not found' }); return; }
    res.json(product);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !price || !category) {
      res.status(400).json({ error: 'name, price and category are required' });
      return;
    }
    const id = toSlug(name);
    const exists = await Product.findOne({ id });
    if (exists) {
      res.status(409).json({ error: `Product with id "${id}" already exists` });
      return;
    }
    const product = await Product.create({ id, name, description: description ?? '', price: Number(price), category, images: [] });
    const obj = product.toObject();
    delete (obj as Record<string, unknown>)._id;
    res.status(201).json(obj);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category } = req.body;
    const update: Record<string, unknown> = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (price !== undefined) update.price = Number(price);
    if (category !== undefined) update.category = category;
    const product = await Product.findOneAndUpdate({ id: req.params.id }, update, { new: true }).select('-_id').lean();
    if (!product) { res.status(404).json({ error: 'Product not found' }); return; }
    res.json(product);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) { res.status(404).json({ error: 'Product not found' }); return; }
    for (const url of product.images) {
      try { await destroyFromCloudinary(url); } catch { /* ignore */ }
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files?.length) { res.status(400).json({ error: 'No files provided' }); return; }
    const product = await Product.findOne({ id: req.params.id });
    if (!product) { res.status(404).json({ error: 'Product not found' }); return; }
    const urls: string[] = [];
    for (const file of files) {
      const result = await uploadToCloudinary(file.buffer, `la-bristol/products/${req.params.id}`);
      urls.push(result.secure_url);
    }
    product.images.push(...urls);
    await product.save();
    const obj = product.toObject();
    delete (obj as Record<string, unknown>)._id;
    res.json(obj);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.body;
    if (!url) { res.status(400).json({ error: 'url is required' }); return; }
    const product = await Product.findOne({ id: req.params.id });
    if (!product) { res.status(404).json({ error: 'Product not found' }); return; }
    try { await destroyFromCloudinary(url); } catch { /* ignore */ }
    product.images = product.images.filter((img) => img !== url);
    await product.save();
    const obj = product.toObject();
    delete (obj as Record<string, unknown>)._id;
    res.json(obj);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};
