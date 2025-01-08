import axios from '@/libs/axiosInstance';

type CreateRoleDto = {
  name: string;
  description: string;
}

export const createRole = async (data: CreateRoleDto) => {
  try {
    const result = await axios.post('/role', data);
    return result.data;
  } catch (error) {
    console.log('🚫 ~ createRole ~ error:', error);
    throw error;
  }
};
