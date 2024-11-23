export type Lesson = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  videoUrl: string;
  classId: number;
  courseId: number;
  examId: number;
  teacherId: number;
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};