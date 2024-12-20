import axios from '@/libs/axiosInstance';

export type CreateLessonDto = {
  startDate: string;
  endDate: string;
  type: string;
  // title: string;
  courseId: number;
  videoUrl: string;
  isActive: boolean;
};

export const createLesson = async (data: CreateLessonDto) => {
  try {
    const res = await axios.post(`/lessons/new`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createLesson ~ error:', error);
    throw error;
  }
};

export type UpdateLessonDto = Partial<CreateLessonDto>;

export const editLesson = async (id: number, data: UpdateLessonDto) => {
  try {
    const res = await axios.patch(`/lessons/item/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ editLesson ~ error:', error);
    throw error;
  }
};

export const deleteLesson = async (id: number) => {
  try {
    const res = await axios.delete(`/lessons/item/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ deleteLesson ~ error:', error);
    throw error;
  }
};