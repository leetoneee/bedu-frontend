import { Question } from "./question-bank.type";

export type Exam = {
  id: number;
  title: string;
  code: string;
  examType: string;
  duration: number;
  maxTries: number;
  resultTime: number;
  description: string;
  isActive: boolean;
  questions: Question[];
}