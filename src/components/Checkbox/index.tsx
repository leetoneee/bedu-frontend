import { useEffect, useState } from 'react';
import { CheckboxProps } from '@/types';

export default function Checkbox({
  isSelected = false,
  onToggle,
}: CheckboxProps) {
  const [selected, setSelected] = useState(isSelected);

  const handleClick = () => {
    setSelected(!selected);
    if (onToggle) {
      onToggle(!selected); // Gọi hàm callback và truyền giá trị mới của selected
    }
  };

  useEffect(() => {
    console.log('Giá trị của selected:', selected);
  }, [selected]);

  return (
    <div
      className={`relative h-5 w-5 rounded-sm border hover:cursor-pointer ${
        selected ? 'border-white bg-on-primary' : 'border-outline bg-white'
      }`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        color="white"
        className="absolute top-0 size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    </div>
  );
}
