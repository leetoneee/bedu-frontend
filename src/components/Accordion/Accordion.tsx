import CourseAccordion from "@/components/Accordion/CourseAccordion";
import { Course } from "@/types/course.type";
// import { getCoursesByProgramId } from "@/data/program-course.data";

const Accordion = ({programId}: {programId: number}) => {
  const listCourses: Course[] = [] // getCoursesByProgramId(programId);
  return listCourses.map((course, index) => {
    return <CourseAccordion key={index} course={course}/>
  })
}

export default Accordion;