import { Lesson } from '@/types/lesson.type';

export const columns = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'TYPE', uid: 'type' },
  { name: 'TITLE', uid: 'name' },
  { name: 'START DATE', uid: 'startDate', sortable: true },
  { name: 'END DATE', uid: 'endDate', sortable: true },
  { name: 'ACTIONS', uid: 'actions' }
];

export const columnsForCouse = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'TYPE', uid: 'type' },
  { name: 'TITLE', uid: 'name' },
  { name: 'STATUS', uid: 'isPublish' },
  { name: 'VIDEO URL', uid: 'videoUrl' },
  { name: 'ACTIONS', uid: 'actions' }
];

export const lessons = [
  {
    id: 1,
    name: 'IELTS Listening Practice',
    startDate: '2024-12-01T10:00:00Z',
    endDate: '2024-12-01T10:30:00Z',
    type: 'Listening Practice',
    videoUrl: 'https://example.com/lesson1.mp4',
    classId: 101,
    courseId: 1,
    examId: 201,
    teacherId: 301
  },
  {
    id: 2,
    name: 'IELTS Reading Skills Development',
    startDate: '2024-12-03T10:00:00Z',
    endDate: '2024-12-03T10:30:00Z',
    type: 'Reading Skills',
    videoUrl: 'https://example.com/lesson2.mp4',
    classId: 101,
    courseId: 1,
    examId: 202,
    teacherId: 302
  },
  {
    id: 3,
    name: 'IELTS Writing Task 1 Strategies',
    startDate: '2024-12-05T10:00:00Z',
    endDate: '2024-12-05T10:30:00Z',
    type: 'Writing Task 1',
    videoUrl: 'https://example.com/lesson3.mp4',
    classId: 102,
    courseId: 2,
    examId: 203,
    teacherId: 303
  },
  {
    id: 4,
    name: 'Speaking Test Practice for Fluency',
    startDate: '2024-12-07T10:00:00Z',
    endDate: '2024-12-07T10:20:00Z',
    type: 'Speaking Test Practice',
    videoUrl: 'https://example.com/lesson4.mp4',
    classId: 102,
    courseId: 2,
    examId: 204,
    teacherId: 304
  },
  {
    id: 5,
    name: 'Vocabulary Building Techniques',
    startDate: '2024-12-09T10:00:00Z',
    endDate: '2024-12-09T10:30:00Z',
    type: 'Vocabulary Building',
    videoUrl: 'https://example.com/lesson5.mp4',
    classId: 103,
    courseId: 3,
    examId: 205,
    teacherId: 305
  },
  {
    id: 6,
    name: 'Grammar Essentials for TOEIC',
    startDate: '2024-12-11T10:00:00Z',
    endDate: '2024-12-11T10:30:00Z',
    type: 'Grammar Essentials',
    videoUrl: 'https://example.com/lesson6.mp4',
    classId: 103,
    courseId: 3,
    examId: 206,
    teacherId: 306
  },
  {
    id: 7,
    name: 'Mock Exam Review and Feedback',
    startDate: '2024-12-13T10:00:00Z',
    endDate: '2024-12-13T10:30:00Z',
    type: 'Mock Exam Review',
    videoUrl: 'https://example.com/lesson7.mp4',
    classId: 104,
    courseId: 4,
    examId: 207,
    teacherId: 307
  },
  {
    id: 8,
    name: 'Listening for Accents in IELTS',
    startDate: '2024-12-15T10:00:00Z',
    endDate: '2024-12-15T10:30:00Z',
    type: 'Listening for Accents',
    videoUrl: 'https://example.com/lesson8.mp4',
    classId: 104,
    courseId: 4,
    examId: 208,
    teacherId: 308
  },
  {
    id: 9,
    name: 'Improving Speaking Fluency',
    startDate: '2024-12-17T10:00:00Z',
    endDate: '2024-12-17T10:15:00Z',
    type: 'Speaking Fluency',
    videoUrl: 'https://example.com/lesson9.mp4',
    classId: 1,
    courseId: 5,
    examId: 209,
    teacherId: 309
  },
  {
    id: 10,
    name: 'Test-Taking Strategies for Success',
    startDate: '2024-12-19T10:00:00Z',
    endDate: '2024-12-19T10:20:00Z',
    type: 'Test-Taking Strategies',
    videoUrl: 'https://example.com/lesson10.mp4',
    classId: 1,
    courseId: 5,
    examId: 210,
    teacherId: 310
  }
];

export const getLessonsByCourseId = (courseId: number) => {
  return lessons.filter((lesson) => {
    return lesson.courseId === courseId;
  });
};

export const getLessonsByClassId = (classId: number) => {
  return lessons.filter((lesson) => {
    return lesson.classId === classId;
  });
};