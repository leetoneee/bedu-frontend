export type Course = {
  id: number;
  code: string;
  title: string;
  courseType: string;
  description: string;
  image: string
  lessonQuantity: number;
  timePerLesson: number;
  price: number;
  isActive: boolean;
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};