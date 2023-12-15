import { Types } from 'mongoose';
import { TReview } from '../review/review.interface';

export type TTags = {
  name: string;
  isDeleted: boolean;
};
export type TDetails = {
  level: string;
  description: string;
};
export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [TTags];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  details: TDetails;
  reviews?: [Types.ObjectId];
};
