import axios from '@/libs/axiosInstance';

export type CreateCourseDto = {
  courseType: string;
  title: string;
  description: string;
  image: string;
  lessonQuantity: number;
  timePerLesson: number;
  price: number;
  programId: number[];
  isActive: boolean;
};

export const createCourse = async (data: CreateCourseDto) => {
  try {
    const res = await axios.post(`/courses/new`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createCourse ~ error:', error);
    throw error;
  }
};

export type UpdateCourseDto = Partial<CreateCourseDto>;

export const editCourse = async (id: number, data: UpdateCourseDto) => {
  try {
    const res = await axios.patch(`/courses/item/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ editCourse ~ error:', error);
    throw error;
  }
};

export const deleteCourse = async (id: number) => {
  try {
    const res = await axios.delete(`/courses/item/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ deleteCourse ~ error:', error);
    throw error;
  }
};