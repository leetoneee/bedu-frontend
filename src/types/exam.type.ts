export type Exam = {
  id: string;
  title: string;
  examType: string;
  duration: number;
  maxTries: number;
  resultTime: number;
  description: string;
  isActive: boolean;
  // questions: Question[];
}