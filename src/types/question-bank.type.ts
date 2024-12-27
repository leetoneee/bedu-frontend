export type Question = {
  id: number;
  question: string;
  totalPoints: number;
  pointDivision: string;
  content: string;
  attach: string;
  questionType: string;
  answer: string;
  possibleAnswer: string;
  examId?: number[];
  documentId?: number[];
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};
