'use client';

import LessonAccordion from '@/components/Accordion/LessonAccordion';
import { getLessonsByCourseId } from '@/data/lesson.data';
import { courseAccordionProps } from '@/types/accordion.type';
import { useRef, useState } from 'react';
import { FaRegFolder } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const CourseAccordion = ({ course }: courseAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lessonsCourse = getLessonsByCourseId(course.id);
  const toggleDropDown = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="pt-4 w-full">
      <div
        className="flex h-[80px] cursor-pointer items-center justify-between rounded-xl border-2 border-outline-focus bg-outline-focus px-4 py-2 text-surface"
        onClick={() => toggleDropDown()}
      >
        <div className="item-center flex max-w-[90%]">
          <span className="flex items-center justify-center rounded-full">
            <FaRegFolder size={30} />
          </span>
          <div className="ml-4 mr-9 flex flex-1 flex-col overflow-hidden">
            <div>
              <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-2xl">
                {course.title}
              </p>
            </div>
            <div>
              <p className="truncate text-sm">
                {course.lessonQuantity} lessons
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {expanded ? (
            <div className="rounded-full border-2 border-highlight p-2">
              <FaChevronUp size={15} />
            </div>
          ) : (
            <div className="rounded-full border-2 border-highlight p-2">
              <FaChevronDown size={15} />
            </div>
          )}
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300 ease-in-out"
        style={{
          maxHeight: expanded ? `${contentRef.current?.scrollHeight}px` : '0px'
        }}
      >
        {/* <LessonAccordion lessons={lessonsCourse} /> */}
      </div>
    </div>
  );
};

export default CourseAccordion;
