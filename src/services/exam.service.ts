import axios from '@/libs/axiosInstance';

export type CreateExamDto = {
  title: string;
  examType: string;
  duration: number;
  maxTries: number;
  resultTime: number;
  description: string;
  questionId: number[];
};

export const createExam = async (data: CreateExamDto) => {
  try {
    const res = await axios.post(`/exams/new`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createExam ~ error:', error);
    throw error;
  }
};

export type UpdateExamDto = Partial<CreateExamDto>;

export const editExam = async (id: number, data: UpdateExamDto) => {
  try {
    const res = await axios.patch(`/exams/item/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ editExam ~ error:', error);
    throw error;
  }
};

export const deleteExam = async (id: number) => {
  try {
    const res = await axios.delete(`/exams/item/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ deleteExam ~ error:', error);
    throw error;
  }
};
