// import { Course } from '@/types/course.type';

const columns = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'CODE', uid: 'code' },
  { name: 'TITLE', uid: 'title', sortable: true },
  // { name: 'TYPE', uid: 'type' },
  { name: 'LESSON QUANTITY', uid: 'lessonQuantity', sortable: true },
  { name: 'PRICE', uid: 'price', sortable: true },
  { name: 'ACTIONS', uid: 'actions' }
];

// const currCourses: Course[] = [
//   {
//     id: 4,
//     code: 'TOEIC-GRAM-104',
//     title: 'TOEIC Grammar Essentials',
//     type: 'Grammar Skills',
//     description:
//       'Focus on mastering grammar structures critical for success in TOEIC exams.',
//     lessonQuantity: 10,
//     price: 149.99,
//     isPublish: false,
//     timePerLesson: 15
//   },
//   {
//     id: 6,
//     code: 'TOEIC-VOC-106',
//     title: 'TOEIC Vocabulary Booster',
//     type: 'Vocabulary Building',
//     description:
//       'Expand your English vocabulary with a focus on TOEIC-related words and phrases.',
//     lessonQuantity: 8,
//     price: 99.99,
//     isPublish: true,
//     timePerLesson: 10
//   },
//   {
//     id: 8,
//     code: 'TOEIC-SW-108',
//     title: 'TOEIC Speaking and Writing Masterclass',
//     type: 'Speaking & Writing',
//     description:
//       "Advanced skills for achieving high scores in TOEIC's speaking and writing sections.",
//     lessonQuantity: 14,
//     price: 269.99,
//     isPublish: false,
//     timePerLesson: 20
//   },
//   {
//     id: 9,
//     code: 'IELTS-LIST-109',
//     title: 'IELTS Listening Practice Lab',
//     type: 'Listening Skills',
//     description:
//       'Practice real-world listening scenarios and improve understanding of various accents.',
//     lessonQuantity: 15,
//     price: 199.99,
//     isPublish: true,
//     timePerLesson: 25
//   },
//   {
//     id: 10,
//     code: 'TOEIC-FND-110',
//     title: 'TOEIC Foundation Course',
//     type: 'English Test Preparation',
//     description:
//       'Beginner-friendly introduction to essential skills for the TOEIC exam.',
//     lessonQuantity: 12,
//     price: 199.99,
//     isPublish: true,
//     timePerLesson: 15
//   }
// ];

// const getCoursesByProgramId = (programId: number): Course[] => {
//   return currCourses;
// }
export { columns };
