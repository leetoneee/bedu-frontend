import { SSProgram } from '@/types/program.type';

export const columns = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'CODE', uid: 'code' },
  { name: 'TITLE', uid: 'title', sortable: true },
  { name: 'STATUS', uid: 'isPublish' },
  { name: 'SESSION QUANTITY', uid: 'sessionQuantity', sortable: true },
  { name: 'PRICE', uid: 'price', sortable: true },
  { name: 'ACTIONS', uid: 'actions' }
];

const statusOptions = [
  { name: 'Published', uid: 'published' },
  { name: 'Unpublished', uid: 'unpublished' }
];

const ssPrograms: SSProgram[] = [
  {
    id: 101,
    title: 'IELTS Academic Preparation',
    code: 'IELTS-AC-2024',
    description:
      'Prepare for the IELTS Academic test with a focus on reading, writing, speaking, and listening skills.',
    sessionQuantity: 20,
    price: 299.99,
    isPublish: true
  },
  {
    id: 102,
    title: 'TOEIC Intensive Training',
    code: 'TOEIC-INT-2024',
    description:
      'A fast-paced program designed to maximize your TOEIC score through test strategies and practice sessions.',
    sessionQuantity: 15,
    price: 249.99,
    isPublish: true
  },
  {
    id: 103,
    title: 'IELTS General Training',
    code: 'IELTS-GEN-2024',
    description:
      'Focus on practical English language skills for migration or work opportunities, based on the IELTS General test format.',
    sessionQuantity: 18,
    price: 279.99,
    isPublish: false
  },
  {
    id: 104,
    title: 'TOEIC Bridge Starter Course',
    code: 'TOEIC-START-2024',
    description:
      'Perfect for beginners, this course builds foundational English skills aligned with TOEIC Bridge testing.',
    sessionQuantity: 10,
    price: 199.99,
    isPublish: true
  },
  {
    id: 105,
    title: 'IELTS Speaking Mastery',
    code: 'IELTS-SPEAK-2024',
    description:
      'An intensive course aimed at improving fluency and confidence in the speaking component of the IELTS exam.',
    sessionQuantity: 12,
    price: 199.99,
    isPublish: true
  },
  {
    id: 106,
    title: 'TOEIC Listening and Reading Focus',
    code: 'TOEIC-LR-2024',
    description:
      'Enhance your comprehension skills for the TOEIC Listening and Reading sections with expert guidance and practice.',
    sessionQuantity: 14,
    price: 229.99,
    isPublish: false
  },
  {
    id: 107,
    title: 'Advanced IELTS Writing',
    code: 'IELTS-WRT-2024',
    description:
      'Detailed strategies and tips for excelling in Task 1 and Task 2 of the IELTS Writing test.',
    sessionQuantity: 10,
    price: 249.99,
    isPublish: true
  },
  {
    id: 108,
    title: 'TOEIC Vocabulary Booster',
    code: 'TOEIC-VOC-2024',
    description:
      'Expand your English vocabulary specifically tailored for the TOEIC exam format.',
    sessionQuantity: 8,
    price: 149.99,
    isPublish: false
  },
  {
    id: 109,
    title: 'IELTS Listening Practice Lab',
    code: 'IELTS-LIST-2024',
    description:
      'Practice real-world listening exercises and improve your ability to understand various accents.',
    sessionQuantity: 15,
    price: 199.99,
    isPublish: true
  },
  {
    id: 110,
    title: 'TOEIC Full Practice Tests',
    code: 'TOEIC-TEST-2024',
    description:
      'Simulated TOEIC exams with detailed feedback and analysis of your performance.',
    sessionQuantity: 5,
    price: 99.99,
    isPublish: true
  },
  {
    id: 111,
    title: 'IELTS General Speaking',
    code: 'IELTS-GSP-2024',
    description:
      'Practice everyday speaking scenarios to prepare for the IELTS General Training exam.',
    sessionQuantity: 10,
    price: 179.99,
    isPublish: false
  },
  {
    id: 112,
    title: 'TOEIC Grammar Essentials',
    code: 'TOEIC-GRAM-2024',
    description:
      'Master essential grammar rules and structures needed to ace the TOEIC exam.',
    sessionQuantity: 12,
    price: 199.99,
    isPublish: true
  },
  {
    id: 113,
    title: 'IELTS Band 7+ Strategy Course',
    code: 'IELTS-STRAT-2024',
    description:
      'Learn high-scoring strategies for all sections of the IELTS exam to achieve a Band 7+.',
    sessionQuantity: 20,
    price: 349.99,
    isPublish: true
  },
  {
    id: 114,
    title: 'TOEIC Speaking and Writing Masterclass',
    code: 'TOEIC-SW-2024',
    description:
      "Develop speaking and writing skills for higher scores on the TOEIC exam's optional sections.",
    sessionQuantity: 14,
    price: 269.99,
    isPublish: false
  },
  {
    id: 115,
    title: 'IELTS Mock Exam Series',
    code: 'IELTS-MOCK-2024',
    description:
      'Simulated IELTS exams with feedback to pinpoint strengths and weaknesses.',
    sessionQuantity: 5,
    price: 129.99,
    isPublish: true
  },
  {
    id: 116,
    title: 'TOEIC Foundation Course',
    code: 'TOEIC-FND-2024',
    description:
      'A beginner-friendly course to introduce key skills required for the TOEIC exam.',
    sessionQuantity: 12,
    price: 199.99,
    isPublish: true
  },
  {
    id: 117,
    title: 'IELTS Listening and Reading Intensive',
    code: 'IELTS-LR-2024',
    description:
      'Intensive training for the listening and reading sections with advanced practice tests.',
    sessionQuantity: 18,
    price: 299.99,
    isPublish: true
  },
  {
    id: 118,
    title: 'TOEIC Professional Communication',
    code: 'TOEIC-PC-2024',
    description:
      "Learn professional communication techniques to excel in TOEIC's workplace-focused scenarios.",
    sessionQuantity: 10,
    price: 199.99,
    isPublish: false
  }
];

export { ssPrograms, statusOptions };
