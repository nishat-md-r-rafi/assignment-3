import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true, unique: true },
});

categorySchema.post('save', (doc, next) => {
  delete doc.__v;
  next();
});

export const Category = model<TCategory>('Category', categorySchema);
