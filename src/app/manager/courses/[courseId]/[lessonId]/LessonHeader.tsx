import React from 'react';
import { TabButtonProps } from '@/types';

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const LessonHeader = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="w-full rounded-t-lg bg-white px-7 py-4 shadow-sm">
      {/* TABS */}
      <div className="flex w-full flex-wrap-reverse gap-2 pt-2 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Information"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Comments"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Documents"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Exercises"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ name, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <div className="flex flex-col">
      <button
        className={`relative flex items-center gap-2 px-1 py-2 text-xl after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full sm:px-2 lg:px-4 ${
          isActive ? 'text-on-primary after:bg-blue-600' : ''
        }`}
        onClick={() => setActiveTab(name)}
      >
        {name}
      </button>
      {isActive && <div className="mt-2 h-[2px] w-full bg-on-primary"></div>}
    </div>
  );
};

export default LessonHeader;
