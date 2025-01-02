import axios from '@/libs/axiosInstance';

export type CreatePaymentDto = {
  userId: number;
  programId: number;
  classId: number;
  amount: number;
  method: string;
  transactionId: string;
};

export const createPayment = async (data: CreatePaymentDto) => {
  try {
    const res = await axios.post(`/payments/new`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createPayment ~ error:', error);
    throw error;
  }
};

export type UpdatePaymentDto = Partial<CreatePaymentDto>;

export const editPayment = async (id: number, data: UpdatePaymentDto) => {
  try {
    const res = await axios.patch(`/payments/item/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ editPayment ~ error:', error);
    throw error;
  }
};

export const deletePayment = async (id: number) => {
  try {
    const res = await axios.delete(`/payments/item/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ deletePayment ~ error:', error);
    throw error;
  }
};
