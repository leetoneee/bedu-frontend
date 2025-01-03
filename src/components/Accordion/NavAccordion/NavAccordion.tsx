import { Course } from '@/types/course.type';
import CourseAccordion from './CourseAccordion';

type Props = {
  courses: Course[];
};

const NavAccordion = ({ courses }: Props) => {
  return courses.map((course, index) => {
    return <CourseAccordion key={index} course={course} />;
  });
};

export default NavAccordion;
