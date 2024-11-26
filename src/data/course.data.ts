import { Course } from '@/types/course.type';

const columns = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'CODE', uid: 'code' },
  { name: 'TITLE', uid: 'title', sortable: true },
  { name: 'STATUS', uid: 'isPublish' },
  { name: 'TYPE', uid: 'type' },
  { name: 'LESSON QUANTITY', uid: 'lessonQuantity', sortable: true },
  { name: 'TIME PER LESSON', uid: 'timePerLesson' },
  { name: 'PRICE', uid: 'price', sortable: true },
  { name: 'ACTIONS', uid: 'actions' }
];

const statusOptions = [
  { name: 'Published', uid: 'published' },
  { name: 'Unpublished', uid: 'unpublished' }
];

const courses: Course[] = [
  {
    id: 1,
    code: 'IELTS-AC-101',
    title: 'IELTS Academic Preparation',
    type: 'English Test Preparation',
    description:
      'Comprehensive preparation for the IELTS Academic test, covering all four skills.',
    lessonQuantity: 20,
    price: 299.99,
    isPublish: true,
    timePerLesson: 30
  },
  {
    id: 2,
    code: 'TOEIC-INT-102',
    title: 'TOEIC Intensive Training',
    type: 'English Test Preparation',
    description:
      'Fast-track course to enhance your TOEIC score with test strategies and exercises.',
    lessonQuantity: 15,
    price: 249.99,
    isPublish: true,
    timePerLesson: 25
  },
  {
    id: 3,
    code: 'IELTS-SPEAK-103',
    title: 'IELTS Speaking Mastery',
    type: 'Speaking Skills',
    description:
      'Specialized course to improve speaking fluency and confidence for the IELTS exam.',
    lessonQuantity: 12,
    price: 199.99,
    isPublish: true,
    timePerLesson: 20
  },
  {
    id: 4,
    code: 'TOEIC-GRAM-104',
    title: 'TOEIC Grammar Essentials',
    type: 'Grammar Skills',
    description:
      'Focus on mastering grammar structures critical for success in TOEIC exams.',
    lessonQuantity: 10,
    price: 149.99,
    isPublish: false,
    timePerLesson: 15
  },
  {
    id: 5,
    code: 'IELTS-MOCK-105',
    title: 'IELTS Mock Exam Series',
    type: 'Test Simulation',
    description:
      'Simulated IELTS exams to help identify strengths and areas for improvement.',
    lessonQuantity: 5,
    price: 129.99,
    isPublish: true,
    timePerLesson: 30
  },
  {
    id: 6,
    code: 'TOEIC-VOC-106',
    title: 'TOEIC Vocabulary Booster',
    type: 'Vocabulary Building',
    description:
      'Expand your English vocabulary with a focus on TOEIC-related words and phrases.',
    lessonQuantity: 8,
    price: 99.99,
    isPublish: true,
    timePerLesson: 10
  },
  {
    id: 7,
    code: 'IELTS-WRT-107',
    title: 'IELTS Advanced Writing',
    type: 'Writing Skills',
    description:
      'Detailed strategies for high-scoring IELTS Writing Task 1 and Task 2 answers.',
    lessonQuantity: 10,
    price: 249.99,
    isPublish: true,
    timePerLesson: 30
  },
  {
    id: 8,
    code: 'TOEIC-SW-108',
    title: 'TOEIC Speaking and Writing Masterclass',
    type: 'Speaking & Writing',
    description:
      "Advanced skills for achieving high scores in TOEIC's speaking and writing sections.",
    lessonQuantity: 14,
    price: 269.99,
    isPublish: false,
    timePerLesson: 20
  },
  {
    id: 9,
    code: 'IELTS-LIST-109',
    title: 'IELTS Listening Practice Lab',
    type: 'Listening Skills',
    description:
      'Practice real-world listening scenarios and improve understanding of various accents.',
    lessonQuantity: 15,
    price: 199.99,
    isPublish: true,
    timePerLesson: 25
  },
  {
    id: 10,
    code: 'TOEIC-FND-110',
    title: 'TOEIC Foundation Course',
    type: 'English Test Preparation',
    description:
      'Beginner-friendly introduction to essential skills for the TOEIC exam.',
    lessonQuantity: 12,
    price: 199.99,
    isPublish: true,
    timePerLesson: 15
  }
];

const getCourseById = (courseId: number): Course => {
  const course = courses.find((course) => course.id === courseId);
  if (!course) {
    throw new Error(`Course with id ${courseId} not found`);
  }
  return course;
};

export { courses, statusOptions, columns, getCourseById };
