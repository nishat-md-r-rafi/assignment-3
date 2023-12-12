import { Types } from 'mongoose';

export type ITags = {
  name: string;
  isDeleted: boolean;
};
export type IDetails = {
  level: string;
  description: string;
};
export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [ITags];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  details: IDetails;
};
