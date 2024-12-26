import { Course } from "./course.type";

export type Program = {
  id: number;
  code: string;
  title: string;
  type: string;
  description: string;
  sessionQuantity: number;
  price: number;
  avatar: string;
  isActive: boolean;
  course: Course[];
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};
