import { Course } from "@/types/course.type"
import { Lesson } from "@/types/lesson.type";

export type courseAccordionProps = {
  course: Course;
}

export type lessonAccordionProps = {
  lessons?: Lesson[];
}