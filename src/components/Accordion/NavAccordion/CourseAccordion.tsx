'use client';

import LessonAccordion from '@/components/Accordion/Accordion/LessonAccordion';
import { Course } from '@/types/course.type';
import { Lesson } from '@/types/lesson.type';
import { useEffect, useRef, useState } from 'react';
import { FaRegFolder } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';

type Props = {
  course: Course;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CourseAccordion = ({ course }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const {
    data
    // isLoading,
    // error: classError,
    // mutate: refreshEndpoint
  } = useSWR(`/courses/item/${course.id}`, fetcher);

  useEffect(() => {
    if (data && data.metadata) {
      setLessons(data.metadata.lesson);
    }
  }, [data]);

  const toggleDropDown = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-full pt-4">
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
              <p className="truncate text-sm">{lessons.length} lessons</p>
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
        <LessonAccordion lessons={lessons} />
      </div>
    </div>
  );
};

export default CourseAccordion;
