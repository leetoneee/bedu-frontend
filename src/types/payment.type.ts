import { EClass } from './class.type';
import { Program } from './program.type';
import { User } from './user.type';

export type Payment = {
  id: number;
  transactionId: string;
  user: User;
  program: Program;
  class: EClass;
  amount: number;
  paymentMethod: {
    id: number;
    name: string;
    description: string;
  };
  status: string;
};
