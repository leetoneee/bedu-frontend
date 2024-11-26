export type Course = {
  id: number;
  code: string;
  title: string;
  type: string;
  description: string;
  lessonQuantity: number;
  timePerLesson: number;
  price: number;
  isPublish: boolean;
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};