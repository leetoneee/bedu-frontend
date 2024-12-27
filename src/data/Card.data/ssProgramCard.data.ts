import { getProgramById } from '@/data/program.data';
import { SSProgramCardProps } from '../../types/programCard.type';

const ssProgramsCard: SSProgramCardProps[] = [
  {
    id: 1,
    code: 'IELTS-AC-2024',
    title: 'IELTS Academic Preparation',
    description:
      'Prepare for the IELTS Academic test with a focus on reading, writing, speaking, and listening skills.',
    lessonQuantity: 20,
    studentQuantity: 25,
    totalTime: 40,
    price: 7000000,
    image: '/images/ielts-academic.jpg',
    type: 2,
    isPublish: true,
    rating: 4.5,
    feedbacks: 150,
  },
  {
    id: 102,
    code: 'TOEIC-INT-2024',
    title: 'TOEIC Intensive Training',
    description:
      'A fast-paced program designed to maximize your TOEIC score through test strategies and practice sessions.',
    lessonQuantity: 15,
    studentQuantity: 30,
    totalTime: 30,
    price: 6000000,
    image: '/images/toeic-intensive.jpg',
    type: 2,
    isPublish: true,
    rating: 4.7,
    feedbacks: 120,
  },
  {
    id: 103,
    code: 'IELTS-GEN-2024',
    title: 'IELTS General Training',
    description:
      'Focus on practical English language skills for migration or work opportunities, based on the IELTS General test format.',
    lessonQuantity: 18,
    studentQuantity: 20,
    totalTime: 36,
    price: 6500000,
    image: '/images/ielts-general.jpg',
    type: 2,
    isPublish: true,
    rating: 4.6,
    feedbacks: 180,
  },
  {
    id: 104,
    code: 'TOEIC-START-2024',
    title: 'TOEIC Bridge Starter Course',
    description:
      'Perfect for beginners, this course builds foundational English skills aligned with TOEIC Bridge testing.',
    lessonQuantity: 10,
    studentQuantity: 15,
    totalTime: 20,
    price: 4500000,
    image: '/images/toeic-starter.jpg',
    type: 2,
    isPublish: true,
    rating: 4.4,
    feedbacks: 110,
  },
  {
    id: 105,
    code: 'IELTS-SPEAK-2024',
    title: 'IELTS Speaking Mastery',
    description:
      'An intensive course aimed at improving fluency and confidence in the speaking component of the IELTS exam.',
    lessonQuantity: 12,
    studentQuantity: 18,
    totalTime: 24,
    price: 5000000,
    image: '/images/ielts-speaking.jpg',
    type: 2,
    isPublish: true,
    rating: 4.8,
    feedbacks: 200,
  },
  {
    id: 106,
    code: 'TOEIC-LR-2024',
    title: 'TOEIC Listening and Reading Focus',
    description:
      'Enhance your comprehension skills for the TOEIC Listening and Reading sections with expert guidance and practice.',
    lessonQuantity: 14,
    studentQuantity: 22,
    totalTime: 28,
    price: 5500000,
    image: '/images/toeic-listening.jpg',
    type: 2,
    isPublish: true,
    rating: 4.6,
    feedbacks: 130,
  },
  {
    id: 107,
    code: 'IELTS-WRT-2024',
    title: 'Advanced IELTS Writing',
    description:
      'Detailed strategies and tips for excelling in Task 1 and Task 2 of the IELTS Writing test.',
    lessonQuantity: 10,
    studentQuantity: 10,
    totalTime: 20,
    price: 6000000,
    image: '/images/ielts-writing.jpg',
    type: 2,
    isPublish: true,
    rating: 4.5,
    feedbacks: 160,
  },
  {
    id: 108,
    code: 'TOEIC-VOC-2024',
    title: 'TOEIC Vocabulary Booster',
    description:
      'Expand your English vocabulary specifically tailored for the TOEIC exam format.',
    lessonQuantity: 8,
    studentQuantity: 12,
    totalTime: 16,
    price: 3500000,
    image: '/images/toeic-vocabulary.jpg',
    type: 2,
    isPublish: true,
    rating: 4.4,
    feedbacks: 140,
  },
  {
    id: 109,
    code: 'IELTS-LIST-2024',
    title: 'IELTS Listening Practice Lab',
    description:
      'Practice real-world listening exercises and improve your ability to understand various accents.',
    lessonQuantity: 15,
    studentQuantity: 25,
    totalTime: 30,
    price: 5000000,
    image: '/images/ielts-listening.jpg',
    type: 2,
    isPublish: true,
    rating: 4.7,
    feedbacks: 210,
  },
  {
    id: 110,
    code: 'TOEIC-TEST-2024',
    title: 'TOEIC Full Practice Tests',
    description:
      'Simulated TOEIC exams with detailed feedback and analysis of your performance.',
    lessonQuantity: 5,
    studentQuantity: 20,
    totalTime: 10,
    price: 2500000,
    image: '/images/toeic-test.jpg',
    type: 2,
    isPublish: true,
    rating: 4.6,
    feedbacks: 180,
  }
];


const getProgramCardById = (programCardId: number): SSProgramCardProps => {
  const programCard = ssProgramsCard.find(
    (program) => program.id === programCardId
  );
  if (!programCard) {
    throw new Error(`ProgramCard with id ${programCardId} not found`);
  }
  return programCard;
};

export { ssProgramsCard, getProgramCardById };