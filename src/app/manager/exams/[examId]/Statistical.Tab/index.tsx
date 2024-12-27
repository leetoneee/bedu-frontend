import React from 'react';

type Props = {
  id: number;
  setIsModalNewTaskOpen?: (isOpen: boolean) => void;
};

const Statistical = ({ id, setIsModalNewTaskOpen }: Props) => {
  return (
    <div className="flex h-full w-full flex-col gap-2 rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
    </div>
  );
};

export default Statistical;
