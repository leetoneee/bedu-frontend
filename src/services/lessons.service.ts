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

export type CreateRecurringLessonDto = {
  classId: number;
  teacherId: number;
  // google's api properties
  summary: string;
  description: string;
  startDate: string; // Ngày bắt đầu do người dùng chọn
  startTime: string; // Giờ bắt đầu (HH:mm)
  endTime: string; // Giờ kết thúc (HH:mm)
  selectedDays: string[]; // ['Mon', 'Wed', 'Fri']
  lessonQuantity: number; // Số tuần lặp lại
}

export const createRecurringLesson = async (data: CreateRecurringLessonDto) => {
  try {
    const res = await axios.post(`/lessons/new-recurring`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createRecurringLesson ~ error:', error);
    throw error;
  }
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