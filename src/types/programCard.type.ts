import { EClass } from "./class.type";
import { Program } from "./program.type";

// type = 1
export type LiveProgramCardProps = {
  id: number;
  code: string;
  name: string;
  rating: number;
  feedbacks: number;
  studyForm: string;
  startDate: string;
  description: string;
  lessonQuantity: number;
  timePerLesson: number;
  price: number;
  isPublish: boolean;
  image: string;
  type?: number;
};

export type OrderCardProps = {
  detail: Program | EClass;
}

//type = 2
export type SSProgramCardProps = {
  id: number;
  code: string;
  title: string;
  description: string;
  lessonQuantity: number;
  studentQuantity: number;
  totalTime: number;
  price: number;
  avatar: string;
  type?: number;
  isPublish: boolean;
  rating: number;
  feedbacks: number;
}