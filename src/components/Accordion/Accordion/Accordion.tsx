import CourseAccordion from '@/components/Accordion/Accordion/CourseAccordion';
import { Course } from '@/types/course.type';

type Props = {
  courses: Course[];
};

const Accordion = ({ courses }: Props) => {
  console.log("🚀 ~ Accordion ~ courses:", courses)
  return courses.map((course, index) => {
    return <CourseAccordion key={index} course={course} />;
  });
};

export default Accordion;
