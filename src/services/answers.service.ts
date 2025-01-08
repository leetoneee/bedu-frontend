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

export const getRateData = async ({
  examId,
  questionId
}: {
  examId: number;
  questionId: number;
}) => {
  try {
    const res = await axios.get(`/answers/rate/exam/${examId}/question/${questionId}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getRateData ~ error:', error);
    throw error;
  }
};
