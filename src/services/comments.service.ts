import axios from '@/libs/axiosInstance';

export type CreateCommentDto = {
  lessonId: number;
  userId: number;
  content: string;
  parentCommentId: number;
}

export const createComment = async (data: CreateCommentDto) => {
  try {
    const res = await axios.post(`/comment`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createComment ~ error:', error);
    throw error;
  } 
}