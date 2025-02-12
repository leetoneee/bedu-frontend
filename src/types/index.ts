import { ReactNode } from 'react';
import { Question } from './question-bank.type';

export type ButtonProps = {
  content?: string;
  className?: string;
  isPrimary?: boolean;
  isDisabled?: boolean;
  iconLeft?: ReactNode | null;
  iconRight?: ReactNode | null;
  onClick?: () => void;
};

export type Crumb = {
  label: string;
  href: string;
  className?: string;
};

export type InputProps = {
  title: string;
  valid?: 'default' | 'error_AtLeast' | 'error_SameName' | 'success';
  placeholder?: string;
  value?: string | number;
  radioValues?: string[];
  readOnly?: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  required?: boolean;
  type?: string;
  suport?: string;
};

export type InputFileProps = {
  filename?: string;
};

export type InputFileHandle = {
  upload: () => Promise<string | undefined>;
};

export type CheckboxProps = {
  isSelected?: boolean;
  onToggle?: (e: boolean) => void;
};

export type EventProps = {
  id: number;
  title: string;
  start: string;
  end: string;
  description: string;
  location?: string;
  people: string[];
};

export type TabButtonProps = {
  name: string;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
  icon?: ReactNode;
};

export type UserAuth = {
  id: number;
  name: string;
  accessToken: string;
  role: string;
  // avatar: string;
};

export type AuthType = {
  auth: UserAuth;
  setAuth: React.Dispatch<React.SetStateAction<UserAuth | undefined>>;
};

export type MyProgramContextType = {
  programId: string;
  setProgramId: React.Dispatch<React.SetStateAction<string>>;
  classId: string;
  setClassId: React.Dispatch<React.SetStateAction<string>>;
};

export type ExamContextType = {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  answers: { [key: number]: string };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
};

export type TimeContextType = {
  remainingTime: number; // Thời gian còn lại (giây)
  startTimer: (duration: number) => void; // Bắt đầu đếm ngược
  stopTimer: () => void; // Dừng đồng hồ
};

export type Column<T> = {
  title: string;
  key: keyof T;
};