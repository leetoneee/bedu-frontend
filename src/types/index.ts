import { ReactNode } from 'react';

export type InputProps = {
  title: string;
  valid?: 'default' | 'error' | 'success';
  placeholder?: string;
  value?: string;
  radioValues?: string[];
  readOnly?: boolean;
  onChange: (e: any) => void;
  required?: boolean;
  type?: string;
  suport?: string;
};

export type Modal_taoBTProps = {
    onSubmit?: () => void;
  };