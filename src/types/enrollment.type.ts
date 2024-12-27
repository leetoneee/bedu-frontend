import { EClass } from './class.type';
import { Program } from './program.type';
import { User } from './user.type';

export type Enrollment = {
  id: number;
  time: string;
  program: Program;
  user: User;
  isActive: boolean;
};

export type EnrollmentClass = {
  id: number;
  time: string;
  class: EClass;
  user: User;
  isActive: boolean;
};