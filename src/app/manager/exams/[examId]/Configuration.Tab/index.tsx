import React from 'react';

type Props = {
  id: number;
  setIsModalNewTaskOpen?: (isOpen: boolean) => void;
};

const Config = ({ id, setIsModalNewTaskOpen }: Props) => {
  return (
    <div className="flex h-full w-full flex-col rounded rounded-t-none border-on-surface/20 bg-white p-5 shadow-sm">
      {/* Code ở đây */}
    </div>
  );
};

export default Config;