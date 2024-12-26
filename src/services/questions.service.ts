import axios from '@/libs/axiosInstance';

export type CreateQuestionDto = {
  question: string;
  totalPoints: number;
  pointDivision: string;
  content: string;
  attach: string;
  questionType: string;
  possibleAnswer: string;
  answer: string;
  examId?: number[];
  documentId?: number[];
};

export const createQuestion = async (data: CreateQuestionDto) => {
  try {
    const res = await axios.post(`/question/new`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createCourse ~ error:', error);
    throw error;
  }
}


export type UpdateQuestionDto = Partial<CreateQuestionDto>;

export const editQuestion = async (id: number, data: UpdateQuestionDto) => {
  try {
    const res = await axios.patch(`/question/item/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ editQuestion ~ error:', error);
    throw error;
  }
}

export const deleteQuestion = async (id: number) => {
  try {
    const res = await axios.delete(`/question/item/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ deleteQuestion ~ error:', error);
    throw error;
  }
}