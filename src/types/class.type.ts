export type EClass = {
  id: number;
  code: string;
  name: string;
  studyForm: string;
  startDate: string;
  description: string;
  lessonQuantity: number;
  timePerLesson: number;
  type: string;
  price: number;
  avatar: string;
  isActive: boolean;
};

const statusOptions = [
  { name: 'Published', uid: 'published' },
  { name: 'Unpublished', uid: 'unpublished' }
];

const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};

export { statusOptions, statusColorMap };
