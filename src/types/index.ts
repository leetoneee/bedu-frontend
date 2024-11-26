import { ReactNode } from 'react';

export type InputProps = {
  title: string;
  valid?: 'default' | 'error_AtLeast' | 'error_SameName' | 'success';
  placeholder?: string;
  value?: string | number;
  radioValues?: string[];
  readOnly?: boolean;
  onChange: (e: any) => void;
  required?: boolean;
  type?: string;
  suport?: string;
};

export type InputFileProps = {
  filename?: string;
};

export type AddProgramModal_Props = {
  onSubmit?: () => void;
};

export type EditProgramModal_Props = {
  onSubmit?: () => void;
};

export type DeleteProgramModal_Props = {
  onSubmit?: () => void;
};

export type AddCourseModal_Props = {
  onSubmit?: () => void;
};

export type EditCourseModal_Props = {
  onSubmit?: () => void;
};

export type DeleteCourseModal_Props = {
  onSubmit?: () => void;
};

export type AddClassModal_Props = {
  onSubmit?: () => void;
};

export type EditClassModal_Props = {
  onSubmit?: () => void;
};

export type DeleteClassModal_Props = {
  onSubmit?: () => void;
};

export type CheckboxProps = {
  isSelected?: boolean;
  onToggle?: (e: boolean) => void;
};