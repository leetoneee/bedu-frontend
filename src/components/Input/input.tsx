import { InputProps } from '@/types';
import { classNames } from '../classNames';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';

function Input({
  title,
  valid = 'default',
  placeholder,
  value,
  readOnly = false,
  onChange,
  required = false,
  type = 'text',
  suport
}: InputProps) {
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    onChange(value);
  };

  const borderClass =
    valid === 'error'
      ? 'border-error'
      : valid === 'success'
      ? 'border-success'
      : 'border-outline';

  return (
    <div className="relative my-2">
      <p className="absolute -top-2 left-2 bg-surface px-1 text-center text-xs text-outline">
        {title} <span className="text-error"> {required && '*'} </span>
      </p>
      <input
        className={classNames(
          'w-full rounded border bg-surface p-2 focus:border-outline-focus focus:outline focus:outline-4 focus:outline-primary-container',
          borderClass
        )}
        value={value}
        placeholder={placeholder}
        id={title}
        readOnly={readOnly}
        disabled={readOnly}
        onChange={handleInputChange}
        required={required}
        type={type}
      />
      {valid === 'error' && (
        <XMarkIcon className="absolute right-2 top-2 h-6 w-6 cursor-pointer text-error" />
      )}
      {valid === 'success' && (
        <CheckIcon className="absolute right-2 top-2 h-6 w-6 text-success" />
      )}
      <p
        className={classNames(
          'h-4 pl-1 text-xs',
          suport ? (valid === 'error' ? 'text-error' : 'visible') : 'invisible'
        )}
      >
        {suport}
      </p>
    </div>
  );
}

export default Input;