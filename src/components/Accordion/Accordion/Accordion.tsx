import CourseAccordion from '@/components/Accordion/Accordion/CourseAccordion';
import { Course } from '@/types/course.type';

type Props = {
  courses: Course[];
};

const Accordion = ({ courses }: Props) => {
  return courses.map((course, index) => {
    return <CourseAccordion key={index} course={course} />;
  });
};

export default Accordion;
