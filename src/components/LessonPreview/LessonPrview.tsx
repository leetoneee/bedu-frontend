'use client';

// import { MyProgramContext } from '@/contexts';
// import { MyProgramContextType } from '@/types';
import { Lesson } from '@/types/lesson.type';
// import { useRouter } from 'next/navigation';
// import { useContext } from 'react';
// import { FaArrowRight } from 'react-icons/fa6';

type Props = {
  lessons: Lesson[];
};
const LessonPreview = ({ lessons }: Props) => {
  // const { classId } = useContext(MyProgramContext) as MyProgramContextType;

  // const router = useRouter();
  if (!lessons) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col">
      {lessons.map((lesson, index) => {
        const startDate = new Date(lesson.startDate);
        const date = startDate.toLocaleDateString('vi-VE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        const startTime = startDate.toLocaleTimeString('vi-VE', {
          hour: '2-digit',
          minute: '2-digit'
        });
        const endDate = new Date(lesson.endDate);
        const endTime = endDate.toLocaleTimeString('vi-VE', {
          hour: '2-digit',
          minute: '2-digit'
        });

        return (
          <div
            key={index}
            className="mt-4 flex h-[80px] w-full max-w-full rounded-xl"
          >
            <div className="flex h-[80px] flex-1 cursor-pointer items-center justify-between rounded-xl border-2 border-outline-focus bg-b-primary px-4 py-2 text-on-surface hover:bg-highlight">
              <div className="flex h-[80px] max-w-[90%] items-center">
                <div className="h-[80px] border-l-8 border-outline-focus"></div>
                <div className="ml-4 mr-4 flex-1 overflow-hidden text-ellipsis whitespace-nowrap md:text-2xl">
                  <span className="sm:text-xl">
                    Lesson {`${index + 1}`}: {lesson.title}
                  </span>
                  <div>
                    <span className="text-base">
                      Date: <span className="text-2xl font-semibold">{date}</span>
                    </span>
                    {` `}|{` `}
                    <span className="text-base">
                      From <span className="text-2xl font-semibold">{startTime}</span> to{' '}
                      <span className="text-2xl font-semibold">{endTime}</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* <div
              className="flex items-center justify-center rounded-full border-2 border-outline-focus p-2"
              onClick={() =>
                router.replace(
                  `/my/eclasses/lesson/${lesson.id}?classId=${classId}`
                )
              }
            >
              <FaArrowRight size={15} />
            </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LessonPreview;
