import axios from '@/libs/axiosInstance';

export type CreateClassDto = {
  name: string;
  studyForm: string;
  startDate: Date;
  avatar: string;
  description: string;
  lessonQuantity: number;
  timePerLesson: number;
  type: string;
  price: number;
};

export const createClass = async (data: CreateClassDto) => {
  try {
    const res = await axios.post(`/classes/new`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createClass ~ error:', error);
    throw error;
  }
};

export type UpdateClassDto = Partial<CreateClassDto>;

export const editClass = async (id: number, data: UpdateClassDto) => {
  try {
    const res = await axios.patch(`/classes/item/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ editClass ~ error:', error);
    throw error;
  }
};

export const deleteClass = async (id: number) => {
  try {
    const res = await axios.delete(`/classes/item/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ deleteClass ~ error:', error);
    throw error;
  }
};

export const findClassByCode = async (code: string) => {
  try {
    const res = await axios.get(`/classes/code/${code}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ findClassByCode ~ error:', error);
    throw error;
  }
}
