import axios from "@/libs/axiosInstance";

export const processPayment = async ({
  method,
  amount,
  content
}: {
  method: string;
  amount: number;
  content: string;
}) => {
  try {
    const res = await axios.post(`/payments/process`, {method, amount, content});
    return res.data;
  } catch (error) {
    console.log('🚫 ~ processPayment ~ error:', error);
    throw error;
  }
};
