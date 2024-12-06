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
  image: string;
};

export type OrderCardProps = {
  id: number;
  code: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export type SSProgramCardProps = {
  id: number;
  code: string;
  title: string;
  description: string;
  lessonQuantity: number;
  studentQuantity: number;
  totalTime: number;
  price: number;
  image: string;
}