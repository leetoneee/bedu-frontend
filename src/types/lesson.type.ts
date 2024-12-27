export type Lesson = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  videoUrl: string;
  classId: number;
  class: {
    id: number;
    name: string;
  } | null;
  teacher: {
    id: number;
    name: string;
  };
  courseId: number;
  examId: number;
  teacherId: number;
  isActive: boolean;
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};
