export interface TextInputProps {
  onChange: (...args) => void;
  value: string;
  label?: string;
  inputId: string;
  type: string;
  leftIcon?: any;
  rightIcon?: any;
  hasError?: boolean;
  errorMessage?: string;
  required?: boolean;
  placeHolder?: string;
  inputClassName?: string;
}
