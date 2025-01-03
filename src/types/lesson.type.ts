import { EClass } from "./class.type";
import { Course } from "./course.type";
import { Exam } from "./exam.type";
import { User } from "./user.type";

export type Lesson = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  videoUrl: string;
  classId: number;
  class: EClass;
  teacher: User;
  course: Course;
  exam: Exam[];
  isActive: boolean;
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};
