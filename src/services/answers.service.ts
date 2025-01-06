import axios from '@/libs/axiosInstance';

export type CreateAnswerDto = {
  userId: number;
  examId: number;
  questionId: number;
  points: number;
  content: string;
};

export const createAnswers = async (data: CreateAnswerDto[]) => {
  try {
    const res = await axios.post(`/answers/newArray`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createAnswers ~ error:', error);
    throw error;
  }
};
