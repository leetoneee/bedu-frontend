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

  const borderClass =
    valid === 'error_AtLeast' || valid === 'error_SameName'
      ? 'border-error'
      : valid === 'success'
        ? 'border-success'
        : 'border-outline';

  return (
    <>
      <div className="relative flex flex-row items-center">
        <p className="w-[180px] bg-white text-sm font-medium items-center mb-4">
          {title} <span className="text-error"> {required && '*'} </span>
        </p>
        <div className='w-full my-auto'>
          <input
            className={classNames(
              'w-full rounded border border-outline p-2 focus:border-black focus:outline focus:outline-primary',
              borderClass
            )}
            value={value}
            placeholder={placeholder}
            id={title}
            readOnly={readOnly}
            disabled={readOnly}
            onChange={(e) => onChange(e)}
            required={required}
            type={type}
          />
          {(valid === 'error_AtLeast' || valid === 'error_SameName') && (
            <XMarkIcon className="absolute right-5 top-2 h-6 w-6 cursor-pointer text-error" />
          )}
          {valid === 'success' && (
            <CheckIcon className="absolute right-5 top-2 h-6 w-6 text-b-success" />
          )}
          <p
            className={classNames(
              'h-4 pl-1 text-xs mt-1',
              suport
                ? valid === 'error_AtLeast' || valid === 'error_SameName'
                  ? 'text-error'
                  : 'visible'
                : 'invisible'
            )}
          >
            {suport}
          </p>
        </div>
      </div>
    </>
  );
}

export default Input;
