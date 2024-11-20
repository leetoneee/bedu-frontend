export type Lesson = {
  id: number;
  startDate: string;
  endDate: string;
  type: string;
  videoUrl: string;
  ClassId: number;
  CourseId: number;
  ExamId: number;
  TeacherId: number;
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};