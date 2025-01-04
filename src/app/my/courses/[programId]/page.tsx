'use client';

import { Breadcrumb, Rating } from '@/components';
import Image from 'next/image';
import { Crumb, MyProgramContextType } from '@/types';
import { useParams } from 'next/navigation';
import { Divider, Spinner } from '@nextui-org/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Course } from '@/types/course.type';
import { Program } from '@/types/program.type';
import useSWR from 'swr';
import axios from '@/libs/axiosInstance';
import NavAccordion from '@/components/Accordion/NavAccordion/NavAccordion';
import { MyProgramContext } from '@/contexts';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProgramDetail = () => {
  const { setProgramId } = useContext(MyProgramContext) as MyProgramContextType;

  const params = useParams();
  const programId = params.programId;

  useEffect(() => {
    setProgramId(programId as string);
  }, [programId]);
  
  const { data, error, isLoading } = useSWR(
    `/programs/item/${programId}`,
    fetcher
  );

  const rating = 4.5;
  const feedbacks = 150;

  const [courses, setCourses] = useState<Course[]>([]);
  const [program, setProgram] = useState<Program>();
  const [lessonQuantity, setLessonQuantity] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const crumbs: Crumb[] = useMemo(() => {
    return [
      {
        label: 'Homepage',
        href: '/'
      },
      {
        label: 'My Courses',
        href: '/my/courses'
      },
      {
        label: program?.title || 'Loading...',
        href: `/self-study-program/${programId}`
      }
    ];
  }, [programId, program]);

  useEffect(() => {
    if (data?.metadata) {
      setProgram(data.metadata);
      setCourses(data.metadata.course);
    }
  }, [data]);

  useEffect(() => {
    if (courses) {
      const totalLesson = courses.reduce(
        (acc, cur) => acc + cur.lessonQuantity,
        0
      );
      const totalMins = courses.reduce(
        (acc, cur) => acc + cur.lessonQuantity * cur.timePerLesson,
        0
      );
      setTotalTime(totalMins / 60);
      setLessonQuantity(totalLesson);
    }
  }, [courses]);

  if (error) return <div>Failed to load data</div>;

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-col gap-4">
        <div className="w-full overflow-hidden rounded-b-[40px] bg-primary">
          <div className="relative h-[212px] bg-outline-focus">
            <Image
              src={'/images/banner.svg'}
              alt="banner"
              fill
              className="overflow-hidden object-cover"
            />

            <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center gap-4 p-16 text-surface xsm:px-4 sm:px-10 md:px-24 lg:px-36">
              <div className="text-3xl font-bold">{program?.title} - {program?.code}</div>
              <div className="text-2xl font-semibold">
                {program?.description}
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <Rating rating={rating} maxStar={5} size={20} />
                </div>
                <div className="text-xl">{feedbacks}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-b-primary pb-16">
          <div className="h-full w-full bg-b-primary">
            <div className="px-24 py-10 text-3xl font-bold text-on-surface lg:px-36">
              Overview of the learning path
            </div>
            <div className="flex flex-col sm:gap-6 md:gap-10 lg:gap-14">
              <div className="flex justify-center xsm:flex-col xsm:px-4 sm:flex-col sm:gap-6 sm:px-10 md:flex-col md:px-24 lg:flex-row lg:px-36">
                <div className="flex h-[106px] w-[450px] justify-between rounded-[20px] border-2 border-outline xsm:w-[300px] sm:w-[400px] md:w-[400px]">
                  <div className="flex flex-col justify-center truncate px-6">
                    <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                      {courses.length}{' '}
                      {courses.length > 1 ? 'milestones' : 'milestone'}{' '}
                      {/**Chỗ cần sửa */}
                    </div>
                    <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                      Allocation of learning path
                    </div>
                  </div>
                  <div className="flex justify-center px-6">
                    <Image
                      src={'/images/location.svg'}
                      alt="location"
                      width={50}
                      height={50}
                      className="hidden sm:block"
                    />
                  </div>
                </div>
                <div className="flex h-[106px] w-[450px] justify-between rounded-[20px] border-2 border-outline xsm:w-[300px] sm:w-[400px] md:w-[400px]">
                  <div className="flex flex-col justify-center truncate px-6">
                    <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                      {lessonQuantity}{' '}
                      {lessonQuantity > 1 ? 'lessons' : 'lesson'}
                    </div>
                    <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                      Correction with teacher
                    </div>
                  </div>
                  <div className="flex justify-center px-6">
                    <Image
                      src={'/images/quantityLesson.svg'}
                      alt="quantityLesson"
                      width={50}
                      height={50}
                      className="hidden sm:block"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center xsm:flex-col xsm:px-4 sm:flex-col sm:gap-6 sm:px-10 md:flex-col md:px-24 lg:flex-row lg:px-36">
                <div className="flex h-[106px] w-[450px] justify-between rounded-[20px] border-2 border-outline xsm:w-[300px] sm:w-[400px] md:w-[400px]">
                  <div className="flex flex-col justify-center truncate px-6">
                    <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                      {totalTime} {totalTime > 1 ? 'hours' : 'hour'}
                    </div>
                    <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                      Own the roadmap
                    </div>
                  </div>
                  <div className="flex justify-center px-6">
                    <Image
                      src={'/images/hourglass_timeProgram.svg'}
                      alt="hourglass_timeProgram"
                      width={50}
                      height={50}
                      className="hidden sm:block"
                    />
                  </div>
                </div>
                <div className="flex h-[106px] w-[450px] justify-between rounded-[20px] border-2 border-outline xsm:w-[300px] sm:w-[400px] md:w-[400px]">
                  <div className="flex w-full flex-col justify-center truncate px-6">
                    <div className="truncate font-semibold text-on-primary sm:text-lg md:text-2xl lg:text-3xl">
                      Toeic 700+ {/**Chỗ cần sửa */}
                    </div>
                    <div className="truncate text-on-surface sm:text-sm md:text-base lg:text-lg">
                      Commitment to output
                      <br></br>targets
                    </div>
                  </div>
                  <div className="flex justify-center px-6">
                    <Image
                      src={'/images/target.svg'}
                      alt="target"
                      width={70}
                      height={70}
                      className="hidden sm:block"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-6 pt-10 text-3xl font-bold text-on-surface xsm:px-4 sm:px-10 md:px-24 lg:px-36">
              Program detail
            </div>
            <div className="flex h-full w-full flex-col justify-center xsm:px-4 sm:px-10 md:px-24 lg:px-36">
              {isLoading && <Spinner />}
              {courses && <NavAccordion courses={courses} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProgramDetail;
