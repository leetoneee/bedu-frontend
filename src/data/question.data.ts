import { Question } from '@/types/question-bank.type';

const columns = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'TITLE', uid: 'content', sortable: true },
  { name: 'QUESTION', uid: 'question' },
  { name: 'QUESTION TYPE', uid: 'questionType' },
  { name: 'SCORE', uid: 'totalPoints', sortable: true },
  { name: 'RELATED EXAMS', uid: 'examId' },
  { name: 'ACTIONS', uid: 'actions' }
];

const dataQuestions: Question[] = [
  {
    id: 1,
    question: "Choose the correct answer: 'She __ to school every day.'",
    totalPoints: 1,
    pointDivision: "",
    content: "Daily routine vocabulary practice",
    attach: "",
    questionType: "single",
    answer: "goes/@/@/@", // "goes" là đáp án đúng
    possibleAnswer: "goes/go/went/going", // Các đáp án có thể
    examId: [1, 2],
  },
  {
    id: 2,
    question: "Select the correct answers: 'These are verbs.'",
    totalPoints: 0.75,
    pointDivision: "",
    content: "Grammar focus: Identifying verbs",
    attach: "",
    questionType: "multiple",
    answer: "run/@/jump/@", // "run" và "jump" là đáp án đúng
    possibleAnswer: "run/eat/jump/dance", // Các đáp án có thể
    examId: [3],
  },
  {
    id: 3,
    question: "The cat is __ the __.",
    totalPoints: 0.5,
    pointDivision: "0.25/0.25", // Chia đều điểm cho từng chỗ trống
    content: "Prepositions of place exercise",
    attach: "",
    questionType: "fillin",
    answer: "on/table", // Các đáp án phải điền vào
    possibleAnswer: "on/table", // Possible answers giống với answer
    examId: [4],
  },
  {
    id: 4,
    question: "Choose the correct answer: 'He __ an apple yesterday.'",
    totalPoints: 1,
    pointDivision: "",
    content: "Past tense practice: Regular and irregular verbs",
    attach: "",
    questionType: "single",
    answer: "@/@/ate/@", // "ate" là đáp án đúng
    possibleAnswer: "eat/eats/ate/eating", // Các đáp án có thể
    examId: [1],
  },
  {
    id: 5,
    question: "Select the correct answers: 'These are adjectives.'",
    totalPoints: 0.75,
    pointDivision: "",
    content: "Descriptive words for objects and people",
    attach: "",
    questionType: "multiple",
    answer: "beautiful/@/strong/@", // "beautiful" và "strong" là đáp án đúng
    possibleAnswer: "beautiful/fast/strong/hard", // Các đáp án có thể
    documentId: [2, 3],
  },
  {
    id: 6,
    question: "The dog is __ the __.",
    totalPoints: 0.25,
    pointDivision: "0.125/0.125", // Chia đều điểm cho từng chỗ trống
    content: "Spatial relations and prepositions",
    attach: "",
    questionType: "fillin",
    answer: "under/chair", // Các đáp án phải điền vào
    possibleAnswer: "under/chair", // Possible answers giống với answer
    documentId: [4],
  },
];


const getAllQuestions = () => {
  return dataQuestions;
};

const getQuestionById = (questionId: number) => {
  const question = dataQuestions.find((data) => data.id === questionId);
  if (!question) {
    throw new Error(`Question with id ${questionId} not found`);
  }
  return question;
};

export {columns, dataQuestions, getAllQuestions, getQuestionById };
