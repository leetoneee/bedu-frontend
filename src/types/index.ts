import { ReactNode } from "react";

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
}

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

export type InputFileHandle = {
  upload: () => Promise<string | undefined>;
};

export type CheckboxProps = {
  isSelected?: boolean;
  onToggle?: (e: boolean) => void;
};

