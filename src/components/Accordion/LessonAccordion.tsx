'use client';

import { lessonAccordionProps } from '@/types/accordion.type';
import { FaArrowRight } from 'react-icons/fa6';

const LessonAccordion = ({ lessons }: lessonAccordionProps) => {
  // Chưa làm vấn đề Program đã thuộc sở hữu thì mới được vào bài học, dưới chỉ là demo cho roadmap
  if (!lessons) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col">
      {lessons.map((lesson, index) => (
        <div
          key={index}
          className="mt-4 flex h-[80px] w-full max-w-full rounded-xl"
        >
          <div className="flex h-[80px] flex-1 cursor-pointer items-center justify-between rounded-xl border-2 border-outline-focus bg-b-primary px-4 py-2 text-on-surface hover:bg-highlight">
            <div className="flex h-[80px] max-w-[90%] items-center">
              <div className="h-[80px] border-l-8 border-outline-focus"></div>
              <div className="ml-4 mr-4 flex-1 overflow-hidden text-ellipsis whitespace-nowrap md:text-2xl">
                <span className="sm:text-xl">{lesson.title}</span>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-full border-2 border-outline-focus p-2">
              <FaArrowRight size={15} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonAccordion;
