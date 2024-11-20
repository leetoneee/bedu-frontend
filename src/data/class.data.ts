import { EClass } from '@/types/class.type';

const columns = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'CODE', uid: 'code' },
  { name: 'TITLE', uid: 'name'},
  { name: 'STATUS', uid: 'isPublish' },
  { name: 'START DATE', uid: 'startDate' },
  { name: 'LESSON QUANTITY', uid: 'lessonQuantity', sortable: true },
  { name: 'TIME PER LESSON', uid: 'timePerLesson' },
  { name: 'PRICE', uid: 'price', sortable: true },
  { name: 'ACTIONS', uid: 'actions' }
];

const classes: EClass[] = [
  {
    id: 1,
    code: 'LIVE-IELTS-001',
    name: 'IELTS Listening and Speaking Mastery',
    studyForm: 'Online',
    startDate: '2024-12-01T09:00:00Z',
    description:
      'Live interactive class for mastering IELTS Listening and Speaking skills.',
    lessonQuantity: 15,
    timePerLesson: 30,
    price: 249.99,
    isPublish: true
  },
  {
    id: 2,
    code: 'LIVE-TOEIC-002',
    name: 'TOEIC Grammar and Vocabulary Essentials',
    studyForm: 'Online',
    startDate: '2024-12-05T10:00:00Z',
    description:
      'TOEIC-focused live classes with emphasis on grammar and vocabulary building.',
    lessonQuantity: 12,
    timePerLesson: 25,
    price: 199.99,
    isPublish: true
  },
  {
    id: 3,
    code: 'LIVE-IELTS-003',
    name: 'IELTS Advanced Writing and Reading',
    studyForm: 'Hybrid (Online + In-person)',
    startDate: '2024-12-10T08:30:00Z',
    description:
      'IELTS advanced writing and reading live sessions with real-time feedback.',
    lessonQuantity: 10,
    timePerLesson: 40,
    price: 299.99,
    isPublish: false
  },
  {
    id: 4,
    code: 'LIVE-TOEFL-004',
    name: 'TOEFL Full Test Preparation',
    studyForm: 'Online',
    startDate: '2024-12-15T11:00:00Z',
    description:
      'Interactive TOEFL preparation classes for mastering all test sections.',
    lessonQuantity: 20,
    timePerLesson: 35,
    price: 349.99,
    isPublish: true
  },
  {
    id: 5,
    code: 'LIVE-ENG-005',
    name: 'General English for Fluency',
    studyForm: 'Online',
    startDate: '2024-12-20T09:00:00Z',
    description:
      'Live general English classes focusing on conversational skills and fluency.',
    lessonQuantity: 18,
    timePerLesson: 20,
    price: 189.99,
    isPublish: true
  },
  {
    id: 6,
    code: 'LIVE-BUS-006',
    name: 'Business English for Professionals',
    studyForm: 'Online',
    startDate: '2024-12-25T10:00:00Z',
    description:
      'Business English live classes designed for professionals to improve workplace communication.',
    lessonQuantity: 10,
    timePerLesson: 30,
    price: 249.99,
    isPublish: false
  },
  {
    id: 7,
    code: 'LIVE-IELTS-007',
    name: 'IELTS Mock Test Series',
    studyForm: 'Hybrid (Online + In-person)',
    startDate: '2025-01-05T10:00:00Z',
    description:
      'Intensive IELTS mock tests with live analysis and feedback sessions.',
    lessonQuantity: 5,
    timePerLesson: 45,
    price: 149.99,
    isPublish: true
  },
  {
    id: 8,
    code: 'LIVE-TOEIC-008',
    name: 'TOEIC Speaking and Listening Practice',
    studyForm: 'Online',
    startDate: '2025-01-10T09:30:00Z',
    description:
      'TOEIC speaking and listening live classes with expert guidance.',
    lessonQuantity: 12,
    timePerLesson: 30,
    price: 219.99,
    isPublish: true
  },
  {
    id: 9,
    code: 'LIVE-KIDS-009',
    name: 'English for Kids',
    studyForm: 'Online',
    startDate: '2025-01-15T10:00:00Z',
    description:
      'Interactive English learning for kids, focused on vocabulary and speaking.',
    lessonQuantity: 20,
    timePerLesson: 15,
    price: 99.99,
    isPublish: true
  },
  {
    id: 10,
    code: 'LIVE-ADV-010',
    name: 'Advanced English for Academic Writing',
    studyForm: 'Online',
    startDate: '2025-01-20T08:00:00Z',
    description:
      'Advanced English live sessions focusing on critical thinking and academic writing.',
    lessonQuantity: 8,
    timePerLesson: 50,
    price: 279.99,
    isPublish: true
  }
];

export { classes, columns };
