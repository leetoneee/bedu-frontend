'use client';

import { classNames } from '@/components';
import { MyProgramContext } from '@/contexts';
import { MyProgramContextType } from '@/types';
import { Lesson } from '@/types/lesson.type';
import { useParams, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa6';

type Props = {
  lessons: Lesson[];
};
const LessonAccordion = ({ lessons }: Props) => {
  const { programId } = useContext(MyProgramContext) as MyProgramContextType;
  const params = useParams();
  const lessonId = Number(params.lessonId);
  
  const router = useRouter();
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
            <div
              className={classNames(
                'flex h-[80px] flex-1 cursor-pointer items-center justify-between rounded-xl border-2 border-outline-focus bg-b-primary px-4 py-2 text-on-surface',
                lesson.id == lessonId ? 'bg-blue-300' : 'hover:bg-highlight'
              )}
            >            <div className="flex h-[80px] max-w-[90%] items-center">
              <div className="h-[80px] border-l-8 border-outline-focus"></div>
              <div className="ml-4 mr-4 flex-1 overflow-hidden text-ellipsis whitespace-nowrap md:text-2xl">
                <span className="sm:text-xl">{lesson.title}</span>
              </div>
            </div>
            <div
              className="flex items-center justify-center rounded-full border-2 border-outline-focus p-2"
              onClick={() => router.replace(`/my/courses/lesson/${lesson.id}?programId=${programId}`)}
            >
              <FaArrowRight size={15} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonAccordion;
