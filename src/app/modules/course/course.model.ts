import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';

const detailsSchema = new Schema<TDetails>({
  level: { type: String, required: true },
  description: { type: String, required: true },
});

const tagsSchema = new Schema<TTags>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, required: true },
  instructor: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  price: { type: Number, required: true },
  tags: [tagsSchema],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  details: detailsSchema,
});

export const Course = model<TCourse>('Course', courseSchema);
