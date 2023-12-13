import { Schema, model } from 'mongoose';
import { TCourse } from './course.interface';

const courseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, required: true },
  instructor: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
});

export const Course = model<TCourse>('Course', courseSchema);
